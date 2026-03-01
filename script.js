const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const year = document.getElementById("year");
const youtubeFeed = document.getElementById("youtubeFeed");
const blogFeed = document.getElementById("blogFeed");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuBtn && nav) {
  const setMenuState = (isOpen) => {
    nav.classList.toggle("open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  };

  menuBtn.addEventListener("click", () => {
    setMenuState(!nav.classList.contains("open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("open")) return;
    if (nav.contains(event.target) || menuBtn.contains(event.target)) return;
    setMenuState(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuState(false);
  });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function trimText(value, maxLength) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trimEnd()}...`;
}

function htmlToText(html) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

async function fetchTextWithFallback(url) {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (response.ok) return await response.text();
  } catch (_) {
    // Continue to proxy fallback.
  }

  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  const response = await fetch(proxyUrl, { cache: "no-store" });
  if (!response.ok) throw new Error("Feed fetch failed.");
  return await response.text();
}

function renderYoutubeCards(items) {
  if (!youtubeFeed) return;

  if (!items.length) {
    youtubeFeed.innerHTML = `
      <article class="card feed-card">
        <p class="feed-excerpt">Unable to load latest videos right now.</p>
        <a class="feed-link" href="https://www.youtube.com/channel/UCLbBOJJTiBc4y8CgHasvdHA" target="_blank" rel="noreferrer">Open YouTube Channel</a>
      </article>
    `;
    return;
  }

  youtubeFeed.innerHTML = items
    .map((item) => {
      const title = escapeHtml(trimText(item.title, 96));
      const thumb = escapeHtml(item.thumb);
      const link = escapeHtml(item.link);
      return `
        <article class="card feed-card">
          <a href="${link}" target="_blank" rel="noreferrer">
            <img class="feed-thumb" src="${thumb}" alt="${title}">
          </a>
          <h4 class="feed-title">${title}</h4>
          <a class="feed-link" href="${link}" target="_blank" rel="noreferrer">Watch Video</a>
        </article>
      `;
    })
    .join("");
}

function parseYoutubeFeed(xmlText) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");
  const entries = Array.from(xmlDoc.querySelectorAll("entry")).slice(0, 3);
  return entries
    .map((entry) => {
      const title = entry.querySelector("title")?.textContent?.trim() || "";
      const link = entry.querySelector("link")?.getAttribute("href") || "";
      const thumb = entry.querySelector("media\\:thumbnail, thumbnail")?.getAttribute("url") || "";
      return { title, link, thumb };
    })
    .filter((item) => item.title && item.link && item.thumb);
}

async function loadYoutubeFeed() {
  const feedUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=UCLbBOJJTiBc4y8CgHasvdHA";
  try {
    const xmlText = await fetchTextWithFallback(feedUrl);
    const items = parseYoutubeFeed(xmlText);
    renderYoutubeCards(items);
  } catch (_) {
    renderYoutubeCards([]);
  }
}

function renderBlogCards(items) {
  if (!blogFeed) return;

  if (!items.length) {
    blogFeed.innerHTML = `
      <article class="card feed-card">
        <p class="feed-excerpt">Unable to load latest posts right now.</p>
        <a class="feed-link" href="https://aigen023.blogspot.com/" target="_blank" rel="noreferrer">Open Blog</a>
      </article>
    `;
    return;
  }

  blogFeed.innerHTML = items
    .map((item) => {
      const title = escapeHtml(trimText(item.title, 90));
      const excerpt = escapeHtml(trimText(item.excerpt, 150));
      const link = escapeHtml(item.link);
      return `
        <article class="card feed-card">
          <h4 class="feed-title">${title}</h4>
          <p class="feed-excerpt">${excerpt}</p>
          <a class="feed-link" href="${link}" target="_blank" rel="noreferrer">Read Post</a>
        </article>
      `;
    })
    .join("");
}

function parseBloggerFeed(data) {
  const entries = data?.feed?.entry || [];
  return entries.slice(0, 3).map((entry) => {
    const title = entry?.title?.$t?.trim() || "";
    const contentHtml = entry?.content?.$t || entry?.summary?.$t || "";
    const excerpt = htmlToText(contentHtml);
    const linkItem = (entry?.link || []).find((link) => link.rel === "alternate");
    const link = linkItem?.href || "https://aigen023.blogspot.com/";
    return { title, excerpt, link };
  }).filter((item) => item.title && item.link);
}

async function loadBlogFeed() {
  const feedUrl = "https://aigen023.blogspot.com/feeds/posts/default?alt=json&max-results=3";
  try {
    const jsonText = await fetchTextWithFallback(feedUrl);
    const data = JSON.parse(jsonText);
    const items = parseBloggerFeed(data);
    renderBlogCards(items);
  } catch (_) {
    renderBlogCards([]);
  }
}

loadYoutubeFeed();
loadBlogFeed();

const refreshIntervalMs = 1000 * 60 * 30;
setInterval(loadYoutubeFeed, refreshIntervalMs);
setInterval(loadBlogFeed, refreshIntervalMs);
