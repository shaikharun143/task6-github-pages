/* ===========================================================
   Shaik Harun Yahya — Portfolio interactions
   =========================================================== */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Nav: scrolled state + mobile toggle + active link ---------- */
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
    // scroll progress bar
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    document.querySelector(".scroll-progress").style.width = (scrolled * 100) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
    })
  );

  // Active section highlight
  const sections = [...document.querySelectorAll("main section[id]")];
  const navMap = {};
  navLinks.querySelectorAll("a").forEach((a) => {
    const id = a.getAttribute("href").slice(1);
    navMap[id] = a;
  });
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          Object.values(navMap).forEach((a) => a.classList.remove("active"));
          if (navMap[e.target.id]) navMap[e.target.id].classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => navObserver.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add("in"));
  } else {
    const revealObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // small natural stagger for siblings entering together
            const delay = entry.target.dataset.delay || (i * 70);
            setTimeout(() => entry.target.classList.add("in"), delay);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => revealObs.observe(el));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll(".stat__num");
  const animateCount = (el) => {
    const target = +el.dataset.target;
    const dur = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const countObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (reduceMotion) e.target.textContent = (+e.target.dataset.target).toLocaleString();
          else animateCount(e.target);
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => countObs.observe(c));

  /* ---------- Terminal typing animation ---------- */
  const term = document.getElementById("terminalBody");
  const script = [
    { t: "$ ", cls: "t-prompt", typed: "kubectl apply -f deploy.yaml", cmd: true },
    { out: "deployment.apps/harun-app configured", cls: "t-ok", delay: 280 },
    { t: "$ ", cls: "t-prompt", typed: "jenkins build --pipeline ci-cd", cmd: true },
    { out: "[1/15] maven build ........ ok", cls: "t-dim", delay: 130 },
    { out: "[5/15] sonarqube gate ..... passed", cls: "t-dim", delay: 130 },
    { out: "[8/15] trivy scan ......... 0 critical", cls: "t-dim", delay: 130 },
    { out: "[12/15] docker push ....... done", cls: "t-dim", delay: 130 },
    { out: "[15/15] deploy to k8s ..... live", cls: "t-ok", delay: 180 },
    { t: "$ ", cls: "t-prompt", typed: "curl -s status/health", cmd: true },
    { out: "200 OK · uptime 99.9% · monitored by grafana", cls: "t-ok", delay: 200 },
    { out: "→ ready to deploy. hire me. ✦", cls: "t-warn", delay: 260 },
  ];

  function renderLine(line, withCursor) {
    const div = document.createElement("div");
    div.className = "t-line";
    if (line.t) {
      const p = document.createElement("span");
      p.className = line.cls;
      p.textContent = line.t;
      div.appendChild(p);
    }
    const body = document.createElement("span");
    body.className = line.cmd ? "t-cmd" : line.cls;
    div.appendChild(body);
    if (withCursor) {
      const cur = document.createElement("span");
      cur.className = "t-cursor";
      div.appendChild(cur);
    }
    term.appendChild(div);
    return { div, body, cursor: div.querySelector(".t-cursor") };
  }

  function typeText(target, text, speed) {
    return new Promise((res) => {
      let i = 0;
      const step = () => {
        target.textContent = text.slice(0, ++i);
        if (i < text.length) setTimeout(step, speed);
        else res();
      };
      step();
    });
  }

  async function runTerminal() {
    if (reduceMotion) {
      script.forEach((l) => {
        const { body } = renderLine(l, false);
        body.textContent = l.cmd ? l.typed : l.out;
      });
      return;
    }
    for (const line of script) {
      if (line.cmd) {
        const { body, cursor, div } = renderLine(line, true);
        await typeText(body, line.typed, 38);
        await new Promise((r) => setTimeout(r, 220));
        if (cursor) cursor.remove();
        term.scrollTop = term.scrollHeight;
      } else {
        await new Promise((r) => setTimeout(r, line.delay || 150));
        const { body } = renderLine(line, false);
        body.textContent = line.out;
        term.scrollTop = term.scrollHeight;
      }
    }
    // restore a final blinking cursor on its own line
    renderLine({ t: "$ ", cls: "t-prompt" }, true);
    term.scrollTop = term.scrollHeight;
  }

  // start terminal once it's visible
  const termObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          runTerminal();
          obs.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  termObs.observe(term);

  /* ---------- Pipeline stage animation ---------- */
  const pipeline = document.getElementById("pipeline");
  if (pipeline) {
    const stages = [...pipeline.querySelectorAll(".pipeline__stage")];
    let pipeRan = false;
    const runPipeline = () => {
      if (pipeRan || reduceMotion) {
        if (reduceMotion) stages.forEach((s) => s.classList.add("done"));
        return;
      }
      pipeRan = true;
      stages.forEach((stage, i) => {
        setTimeout(() => {
          stage.classList.add("run");
          setTimeout(() => {
            stage.classList.remove("run");
            stage.classList.add("done");
          }, 420);
        }, i * 320);
      });
    };
    const pipeObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            runPipeline();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    pipeObs.observe(pipeline);
  }

  /* ---------- Custom cursor ---------- */
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (dot && ring && window.matchMedia("(pointer:fine)").matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.querySelectorAll("a, button, [data-cursor], .skill-card, .project").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });
  }

  /* ---------- Subtle parallax on hero glows ---------- */
  if (!reduceMotion) {
    const g1 = document.querySelector(".bg-glow--1");
    const g2 = document.querySelector(".bg-glow--2");
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      if (g1) g1.style.marginLeft = x * 30 + "px";
      if (g2) g2.style.marginLeft = -x * 30 + "px";
    });
  }
})();
