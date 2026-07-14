const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const baseUrl = process.env.PROTOTYPE_BASE_URL || "http://127.0.0.1:4173/prototype/static-v2";
const edgePath = process.env.EDGE_PATH || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const screenshotDir = path.join(__dirname, "screenshots");

const pages = [
  ["U-P01-home", "index.html", 390, 844],
  ["U-P02-seats", "seats.html", 390, 844],
  ["U-P03-detail", "seat-detail.html", 390, 844],
  ["U-P04-reserve", "reserve.html", 390, 844],
  ["U-P05-my-reservations", "my-reservations.html", 390, 844],
  ["A-P01-login", "admin-login.html", 1366, 768],
  ["A-P02-reservations", "admin-reservations.html", 1366, 768],
  ["A-P03-seats", "admin-seats.html", 1366, 768],
  ["A-P04-stats", "admin-stats.html", 1366, 768],
  ["state-empty", "seats.html?state=empty", 390, 844],
  ["state-conflict", "reserve.html?state=error", 390, 844],
  ["state-admin-error", "admin-stats.html?state=error", 1366, 768]
];

function channel(value) {
  const normalized = value / 255;
  return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
}

function luminance(hex) {
  const value = hex.replace("#", "");
  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);
  return 0.2126 * channel(red) + 0.7152 * channel(green) + 0.0722 * channel(blue);
}

function contrastRatio(foreground, background) {
  const light = Math.max(luminance(foreground), luminance(background));
  const dark = Math.min(luminance(foreground), luminance(background));
  return (light + 0.05) / (dark + 0.05);
}

function inspectContrast() {
  const pairs = [
    ["mainText", "#202725", "#ffffff"],
    ["mutedText", "#65716d", "#ffffff"],
    ["primaryButton", "#ffffff", "#1f6b5c"],
    ["successTag", "#25613b", "#e8f4ec"],
    ["reservedTag", "#2457a6", "#e8f0fe"],
    ["warningTag", "#8a5a00", "#fff4d8"],
    ["dangerTag", "#9b2c2c", "#fdecec"],
    ["completedTag", "#58635f", "#ecefed"]
  ];

  const results = pairs.map(([name, foreground, background]) => {
    const ratio = contrastRatio(foreground, background);
    return { name, foreground, background, ratio: Number(ratio.toFixed(2)), passed: ratio >= 4.5 };
  });
  return { pairs: results, passed: results.every((result) => result.passed) };
}

async function inspectPage(browser, entry) {
  const [name, relativeUrl, width, height] = entry;
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];

  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));

  const response = await page.goto(`${baseUrl}/${relativeUrl}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(screenshotDir, `${name}.png`), fullPage: false });

  const metrics = await page.evaluate(() => {
    const main = document.querySelector("main");
    const visibleText = document.body.innerText.trim();
    const allowedOverflow = ["table-responsive", "date-strip", "desktop-nav", "admin-nav"];
    const overflow = Array.from(document.querySelectorAll("body *")).filter((element) => {
      if (!(element instanceof HTMLElement)) return false;
      if (allowedOverflow.some((className) => element.classList.contains(className))) return false;
      const style = getComputedStyle(element);
      if (style.display === "none" || style.visibility === "hidden") return false;
      return element.scrollWidth > element.clientWidth + 3 && style.overflowX === "visible";
    }).slice(0, 8).map((element) => ({
      tag: element.tagName,
      className: element.className,
      scrollWidth: element.scrollWidth,
      clientWidth: element.clientWidth
    }));

    return {
      title: document.title,
      bodyWidth: document.body.scrollWidth,
      viewportWidth: window.innerWidth,
      mainVisible: Boolean(main && main.getBoundingClientRect().height > 40),
      visibleTextLength: visibleText.length,
      links: document.querySelectorAll("a[href]").length,
      forms: document.querySelectorAll("form").length,
      unnamedInteractive: Array.from(document.querySelectorAll('a[href], button, input, select, textarea')).filter((element) => {
        const style = getComputedStyle(element);
        if (style.display === "none" || style.visibility === "hidden") return false;
        const label = element.id ? document.querySelector(`label[for="${CSS.escape(element.id)}"]`) : null;
        const name = element.getAttribute("aria-label") || element.getAttribute("title") || element.textContent.trim() || (label ? label.textContent.trim() : "");
        return name.length === 0;
      }).map((element) => element.outerHTML.slice(0, 120)),
      overflow
    };
  });

  const result = {
    name,
    url: relativeUrl,
    viewport: `${width}x${height}`,
    status: response ? response.status() : 0,
    ok: Boolean(response && response.ok() && metrics.mainVisible && metrics.visibleTextLength > 40 && metrics.bodyWidth <= metrics.viewportWidth + 1 && errors.length === 0 && metrics.overflow.length === 0 && metrics.unnamedInteractive.length === 0),
    metrics,
    errors
  };

  await context.close();
  return result;
}

async function inspectFlows(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const userSteps = [];

  await page.goto(`${baseUrl}/index.html`, { waitUntil: "networkidle" });
  await page.locator('a.btn-brand[href="seats.html"]').click();
  userSteps.push(page.url().endsWith("/seats.html"));
  await page.locator('a.seat-card[href="seat-detail.html"]').first().click();
  userSteps.push(page.url().endsWith("/seat-detail.html"));
  await page.locator('a[href="reserve.html"]').click();
  userSteps.push(page.url().endsWith("/reserve.html"));
  await page.locator('button[type="submit"]').click();
  await page.waitForURL(/my-reservations\.html\?state=success$/);
  userSteps.push(/my-reservations\.html\?state=success$/.test(page.url()));
  await context.close();

  const adminContext = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  const adminPage = await adminContext.newPage();
  const adminSteps = [];
  await adminPage.goto(`${baseUrl}/admin-login.html`, { waitUntil: "networkidle" });
  await adminPage.locator('button[type="submit"]').click();
  await adminPage.waitForURL(/admin-stats\.html$/);
  adminSteps.push(adminPage.url().endsWith("/admin-stats.html"));
  await adminPage.locator('.admin-nav a[href="admin-reservations.html"]').click();
  adminSteps.push(adminPage.url().endsWith("/admin-reservations.html"));
  await adminPage.locator('.admin-nav a[href="admin-seats.html"]').click();
  adminSteps.push(adminPage.url().endsWith("/admin-seats.html"));
  await adminPage.locator('.admin-sidebar-footer a[href="admin-login.html"]').click();
  adminSteps.push(adminPage.url().endsWith("/admin-login.html"));
  await adminContext.close();

  return {
    userFlow: userSteps.every(Boolean),
    adminFlow: adminSteps.every(Boolean),
    userSteps,
    adminSteps
  };
}

async function captureComponentStates(browser) {
  const adminContext = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  const adminPage = await adminContext.newPage();
  await adminPage.goto(`${baseUrl}/admin-seats.html`, { waitUntil: "networkidle" });
  await adminPage.locator('button[data-bs-target="#seatEditor"]').first().click();
  await adminPage.locator("#seatEditor.show").waitFor();
  await adminPage.waitForTimeout(500);
  await adminPage.screenshot({ path: path.join(screenshotDir, "A-P03-editor.png"), fullPage: false });
  const editorVisible = await adminPage.locator("#seatEditor.show").isVisible();
  await adminContext.close();

  const userContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const userPage = await userContext.newPage();
  await userPage.goto(`${baseUrl}/my-reservations.html`, { waitUntil: "networkidle" });
  await userPage.locator('button[data-bs-target="#cancelModal"]').click();
  await userPage.locator("#cancelModal.show").waitFor();
  await userPage.waitForTimeout(500);
  await userPage.screenshot({ path: path.join(screenshotDir, "U-P05-cancel-modal.png"), fullPage: false });
  const modalVisible = await userPage.locator("#cancelModal.show").isVisible();
  await userContext.close();

  return { editorVisible, modalVisible };
}

async function inspectKeyboard(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/index.html`, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const firstFocusIsSkipLink = await page.locator(".skip-link").evaluate((element) => element === document.activeElement);
  await page.keyboard.press("Tab");
  const secondFocusHasName = await page.evaluate(() => {
    const element = document.activeElement;
    return Boolean(element && (element.getAttribute("aria-label") || element.textContent.trim()));
  });
  await context.close();
  return { firstFocusIsSkipLink, secondFocusHasName, passed: firstFocusIsSkipLink && secondFocusHasName };
}

(async () => {
  fs.mkdirSync(screenshotDir, { recursive: true });
  const browser = await chromium.launch({ headless: true, executablePath: edgePath });
  const results = [];

  for (const entry of pages) {
    results.push(await inspectPage(browser, entry));
  }
  const flows = await inspectFlows(browser);
  const components = await captureComponentStates(browser);
  const keyboard = await inspectKeyboard(browser);
  const contrast = inspectContrast();
  await browser.close();

  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    pages: results,
    flows,
    components,
    keyboard,
    contrast,
    passed: results.every((result) => result.ok) && flows.userFlow && flows.adminFlow && components.editorVisible && components.modalVisible && keyboard.passed && contrast.passed
  };

  fs.writeFileSync(path.join(__dirname, "qa-results.json"), JSON.stringify(report, null, 2), "utf8");
  process.stdout.write(JSON.stringify(report, null, 2));
  process.exitCode = report.passed ? 0 : 1;
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
