/* ==========================================================
   Cophin Cafe Leipzig – Takeaway & Pre-Order
   Vanilla JS: i18n (DE/EN), Swiper + custom dropdown (synced),
   dynamic cup filter + mood colors, WhatsApp order link
   ========================================================== */
(() => {
  'use strict';

  /* ---------- Config ---------- */
  const WA_NUMBER = '4915000000000';
  const DEFAULT_LANG = 'de';
  const STORAGE_KEY = 'cophin-lang';

  /* ---------- Translations ---------- */
  const I18N = {
    de: {
      title: 'Cophin Cafe Leipzig – Takeaway & Vorbestellung',
      meta_desc: 'Bestelle vor bei Cophin Cafe Leipzig: Kaffee, Brunch den ganzen Tag und Takeaway per WhatsApp.',
      skip: 'Zum Bestellformular springen',
      lang_aria: 'Sprache wählen',
      hero_badge: 'Brunch den ganzen Tag',
      hero_title_1: 'Sonne im Gesicht.',
      hero_title_2: 'Kaffee in der Hand.',
      hero_sub: 'Dein Herbst-Lieblingsplatz in Leipzig. Bestell vor, hol ab und genieß Kaffee und Brunch ganz ohne Warten.',
      hero_cta: 'Jetzt vorbestellen',
      order_eyebrow: 'Takeaway & Vorbestellung',
      order_title: 'Dein Moment. Schon bereit.',
      order_lead: 'Wähle deine Favoriten, nenn uns deinen Namen – wir packen alles ein, bis du da bist.',
      step_category: 'Kategorie',
      cat_drinks: 'Kaffee & Getränke',
      cat_food: 'Brunch & Essen',
      step_item: 'Deine Auswahl',
      swipe_hint: 'Wische oder wähle aus der Liste',
      prev_item: 'Vorheriges Produkt',
      next_item: 'Nächstes Produkt',
      step_extras: 'Extras',
      extra_oat: 'Hafermilch',
      extra_shot: 'Extra Shot',
      extra_takeaway: 'Zum Mitnehmen',
      free: 'Gratis',
      step_details: 'Deine Angaben',
      name_label: 'Name',
      name_ph: 'Dein Name',
      name_error: 'Bitte gib deinen Namen an.',
      time_label: 'Abholzeit',
      time_10: 'in 10 Min',
      time_20: 'in 20 Min',
      time_30: 'in 30 Min',
      summary_title: 'Deine Bestellung',
      total: 'Gesamt',
      none: 'Keine',
      wa_button: 'Bestellung per WhatsApp senden',
      wa_hint: 'Du wirst zu WhatsApp weitergeleitet. Bezahlt wird bei der Abholung.',
      wa_message: 'Hallo Cophin Cafe! Ich möchte gerne vorbestellen. Name: {name}. Abholzeit: {time}. Bestellung: {item}. Extras: {extras}. Gesamt: {total}.',
      footer_tag: 'Brunch den ganzen Tag. Kaffeekultur aus Leipzig.',
      footer_visit: 'Besuch uns',
      footer_follow: 'Folge uns',
    },
    en: {
      title: 'Cophin Cafe Leipzig – Takeaway & Pre-Order',
      meta_desc: 'Pre-order at Cophin Cafe Leipzig: coffee, brunch all day and takeaway via WhatsApp.',
      skip: 'Skip to the order form',
      lang_aria: 'Choose language',
      hero_badge: 'Brunch all day',
      hero_title_1: 'Sun in face.',
      hero_title_2: 'Coffee in hand.',
      hero_sub: 'Your cozy autumn spot in Leipzig. Pre-order, pick up and enjoy your coffee and brunch without the wait.',
      hero_cta: 'Pre-order now',
      order_eyebrow: 'Takeaway & Pre-Order',
      order_title: 'Your moment. Already waiting.',
      order_lead: 'Pick your favourites and tell us your name – we’ll have everything packed by the time you arrive.',
      step_category: 'Category',
      cat_drinks: 'Coffee & Drinks',
      cat_food: 'Brunch & Food',
      step_item: 'Your pick',
      swipe_hint: 'Swipe or pick from the list',
      prev_item: 'Previous item',
      next_item: 'Next item',
      step_extras: 'Extras',
      extra_oat: 'Oat milk',
      extra_shot: 'Extra shot',
      extra_takeaway: 'Takeaway',
      free: 'Free',
      step_details: 'Your details',
      name_label: 'Name',
      name_ph: 'Your name',
      name_error: 'Please enter your name.',
      time_label: 'Pickup time',
      time_10: 'in 10 min',
      time_20: 'in 20 min',
      time_30: 'in 30 min',
      summary_title: 'Your order',
      total: 'Total',
      none: 'None',
      wa_button: 'Send Order via WhatsApp',
      wa_hint: 'You’ll be redirected to WhatsApp. Payment is made on pickup.',
      wa_message: 'Hello Cophin Cafe! I would like to pre-order. Name: {name}. Pickup: {time}. Order: {item}. Extras: {extras}. Total: {total}.',
      footer_tag: 'Brunch all day. Leipzig coffee culture.',
      footer_visit: 'Visit us',
      footer_follow: 'Follow us',
    },
  };

  /* ---------- Menu data (prices in cents) ----------
     `filter` is applied to the cup image (#dynamic-item);
     `mood` picks the page + order-card colors in the CSS. */
  const MENU = [
    {
      id: 'psl', cat: 'drinks', cents: 450, mood: 'pumpkin', bg: '#F9DFC4',
      filter: 'hue-rotate(0deg) saturate(1.35) brightness(1.03)',        // warm orange
      name: { de: 'Pumpkin Spice Latte', en: 'Pumpkin Spice Latte' },
      desc: {
        de: 'Cremiger Espresso mit Kürbis, Zimt und Muskat – der Herbst in der Tasse.',
        en: 'Creamy espresso with pumpkin, cinnamon and nutmeg – autumn in a cup.',
      },
    },
    {
      id: 'cold', cat: 'drinks', cents: 490, mood: 'caramel', bg: '#E8CBA6',
      filter: 'hue-rotate(-12deg) saturate(0.85) brightness(0.6)',       // dark brown
      name: { de: 'Iced Caramel Cold Brew', en: 'Iced Caramel Cold Brew' },
      desc: {
        de: 'Langsam gezogener Cold Brew auf Eis mit hausgemachtem Karamell.',
        en: 'Slow-steeped cold brew over ice with house-made caramel.',
      },
    },
    {
      id: 'avo', cat: 'food', cents: 900, mood: 'avocado', bg: '#DDE9CA',
      filter: 'hue-rotate(78deg) saturate(0.95) brightness(1.04)',       // soft green
      name: { de: 'Avocado Bread', en: 'Avocado Bread' },
      desc: {
        de: 'Frisch gebackenes Brot, cremige Avocado, Zitrone und eine Prise Chili.',
        en: 'Fresh-baked bread, creamy avocado, lemon and a pinch of chili.',
      },
    },
    {
      id: 'sand', cat: 'food', cents: 950, mood: 'beige', bg: '#F2E7D4',
      filter: 'hue-rotate(8deg) saturate(0.5) brightness(1.08)',         // warm beige
      name: { de: 'Cophin Sandwich', en: 'Cophin Sandwich' },
      desc: {
        de: 'Unser Signature-Sandwich – herzhaft, frisch und großzügig belegt.',
        en: 'Our signature sandwich – hearty, fresh and generously filled.',
      },
    },
  ];

  /* ---------- Extras (prices in cents) ---------- */
  const EXTRAS = {
    oat:      { cents: 50,  drinksOnly: true,  key: 'extra_oat' },
    shot:     { cents: 100, drinksOnly: true,  key: 'extra_shot' },
    takeaway: { cents: 0,   drinksOnly: false, key: 'extra_takeaway' },
  };

  /* ---------- State ---------- */
  const state = {
    lang: DEFAULT_LANG,
    category: 'drinks',
    itemId: 'psl',
    extras: new Set(),
    name: '',
    pickup: '10',
  };

  /* ---------- DOM helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const el = {
    body: document.body,
    themeMeta: $('meta[name="theme-color"]'),
    descMeta: $('meta[name="description"]'),
    langSwitch: $('.lang-switch'),
    langBtns: $$('.lang-btn'),
    segmented: $('.segmented'),
    catRadios: $$('input[name="category"]'),
    img: $('#dynamic-item'),
    previewName: $('#preview-name'),
    previewPrice: $('#preview-price'),
    swiperRoot: $('#item-swiper'),
    wrapper: $('#swiper-wrapper'),
    prevBtn: $('#swipe-prev'),
    nextBtn: $('#swipe-next'),
    dots: $('#swipe-dots'),
    dd: $('#item-dropdown'),
    ddTrigger: $('#dd-trigger'),
    ddValue: $('#dd-value'),
    ddPrice: $('#dd-price'),
    ddList: $('#dd-list'),
    checks: $$('.check'),
    nameInput: $('#cust-name'),
    nameField: $('#cust-name').closest('.field'),
    nameError: $('#name-error'),
    pickup: $('#pickup'),
    summaryLines: $('#summary-lines'),
    summaryTotal: $('#summary-total'),
    waBtn: $('#wa-btn'),
    form: $('#order-form'),
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let rebuilding = false; // true while slides/options are being replaced

  /* ---------- Utilities ---------- */
  const t = (key) => (I18N[state.lang] && I18N[state.lang][key]) || I18N[DEFAULT_LANG][key] || key;

  const formatters = {};
  function money(cents) {
    const locale = state.lang === 'de' ? 'de-DE' : 'en-IE';
    formatters[locale] = formatters[locale] ||
      new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' });
    return formatters[locale].format(cents / 100);
  }

  const fill = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : ''));
  const byId = (id) => MENU.find((i) => i.id === id);
  const currentItem = () => byId(state.itemId);
  const itemsInCat = () => MENU.filter((i) => i.cat === state.category);
  const indexInCat = (id) => itemsInCat().findIndex((i) => i.id === id);
  const activeExtras = () => Object.keys(EXTRAS).filter((k) => state.extras.has(k));

  function totalCents() {
    return currentItem().cents + activeExtras().reduce((sum, k) => sum + EXTRAS[k].cents, 0);
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  }

  /* ==========================================================
     Slider adapter – Swiper.js, with a one-slide-at-a-time
     fallback if the CDN script could not load.
     ========================================================== */
  const slider = {
    swiper: null,
    fallbackIndex: 0,

    init() {
      if (typeof window.Swiper === 'function') {
        this.swiper = new window.Swiper(el.swiperRoot, {
          slidesPerView: 1,
          spaceBetween: 14,
          speed: 520,
          grabCursor: true,
          resistanceRatio: 0.55,
          threshold: 4,
          a11y: { enabled: false }, // we provide our own buttons, dots and live preview
        });
        this.swiper.on('slideChange', onSwipe);
      } else {
        el.swiperRoot.classList.add('no-swiper');
      }
    },

    rebuild(slidesHtml) {
      if (this.swiper) {
        this.swiper.removeAllSlides();
        this.swiper.appendSlide(slidesHtml);
        this.swiper.update();
      } else {
        el.wrapper.innerHTML = slidesHtml.join('');
      }
    },

    index() {
      return this.swiper ? this.swiper.activeIndex : this.fallbackIndex;
    },

    // runCallbacks = false, so programmatic moves never re-trigger onSwipe
    goTo(i, animate) {
      if (this.swiper) {
        this.swiper.slideTo(i, animate && !reduceMotion ? 520 : 0, false);
      } else {
        this.fallbackIndex = i;
        $$('.swiper-slide', el.wrapper).forEach((s, k) => s.classList.toggle('is-active', k === i));
      }
    },
  };

  function slideHtml(item) {
    return '<div class="swiper-slide" data-id="' + item.id + '">' +
      '<div class="slide-body">' +
        '<span class="slide-name" data-slide-name></span>' +
        '<span class="slide-desc" data-slide-desc></span>' +
        '<span class="slide-price" data-slide-price></span>' +
      '</div></div>';
  }

  // Fires when the user swipes (Swiper emits it once the active slide changes)
  function onSwipe() {
    updateNav();
    if (rebuilding) return;
    const item = itemsInCat()[slider.index()];
    if (item && item.id !== state.itemId) setItem(item.id, true, 'swiper');
  }

  function updateNav() {
    const count = itemsInCat().length;
    const idx = slider.index();
    el.prevBtn.disabled = idx <= 0;
    el.nextBtn.disabled = idx >= count - 1;
    $$('.swipe-dot', el.dots).forEach((dot, k) => {
      dot.classList.toggle('is-active', k === idx);
      if (k === idx) dot.setAttribute('aria-current', 'true'); else dot.removeAttribute('aria-current');
    });
  }

  /* ==========================================================
     Rendering of items (slides, dots, dropdown options)
     ========================================================== */
  function renderItems() {
    const list = itemsInCat();

    slider.rebuild(list.map(slideHtml));

    el.dots.textContent = '';
    list.forEach((item, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'swipe-dot';
      dot.dataset.index = String(i);
      el.dots.appendChild(dot);
    });

    el.ddList.textContent = '';
    list.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'dd-option';
      li.id = 'opt-' + item.id;
      li.setAttribute('role', 'option');
      li.dataset.id = item.id;
      li.innerHTML = '<span class="dd-opt-name" data-opt-name></span><span class="dd-opt-price" data-opt-price></span>';
      el.ddList.appendChild(li);
    });

    refreshItemTexts();
  }

  function refreshItemTexts() {
    $$('.swiper-slide', el.wrapper).forEach((slide) => {
      const item = byId(slide.dataset.id);
      if (!item) return;
      $('[data-slide-name]', slide).textContent = item.name[state.lang];
      $('[data-slide-desc]', slide).textContent = item.desc[state.lang];
      $('[data-slide-price]', slide).textContent = money(item.cents);
    });

    $$('.dd-option', el.ddList).forEach((opt) => {
      const item = byId(opt.dataset.id);
      if (!item) return;
      $('[data-opt-name]', opt).textContent = item.name[state.lang];
      $('[data-opt-price]', opt).textContent = money(item.cents);
    });

    $$('.swipe-dot', el.dots).forEach((dot, k) => {
      const item = itemsInCat()[k];
      if (item) dot.setAttribute('aria-label', item.name[state.lang]);
    });
  }

  function refreshPreview() {
    const item = currentItem();
    el.previewName.textContent = item.name[state.lang];
    el.previewPrice.textContent = money(item.cents);
  }

  function refreshExtraPrices() {
    $$('.check-price').forEach((node) => {
      const cents = Number(node.dataset.price);
      node.textContent = cents === 0 ? t('free') : '+' + money(cents);
    });
  }

  function refreshSummary() {
    const item = currentItem();
    const lines = [];
    lines.push('<li><span>' + escapeHtml(item.name[state.lang]) + '</span><span>' + money(item.cents) + '</span></li>');
    activeExtras().forEach((k) => {
      const price = EXTRAS[k].cents === 0 ? t('free') : '+' + money(EXTRAS[k].cents);
      lines.push('<li class="sub"><span>' + escapeHtml(t(EXTRAS[k].key)) + '</span><span>' + price + '</span></li>');
    });
    el.summaryLines.innerHTML = lines.join('');
    el.summaryTotal.textContent = money(totalCents());
  }

  /* ==========================================================
     Custom dropdown (button + listbox, fully keyboard accessible)
     ========================================================== */
  const dd = { open: false, active: 0 };
  const ddOptions = () => $$('.dd-option', el.ddList);

  function syncDropdown() {
    const item = currentItem();
    el.ddValue.textContent = item.name[state.lang];
    el.ddPrice.textContent = money(item.cents);
    ddOptions().forEach((opt) => {
      const selected = opt.dataset.id === state.itemId;
      opt.setAttribute('aria-selected', String(selected));
    });
  }

  function setActiveOption(i) {
    const opts = ddOptions();
    if (!opts.length) return;
    dd.active = Math.max(0, Math.min(opts.length - 1, i));
    opts.forEach((o, k) => o.classList.toggle('is-active', k === dd.active));
    const opt = opts[dd.active];
    el.ddList.setAttribute('aria-activedescendant', opt.id);

    // keep the active option visible without scrolling the page itself
    const top = opt.offsetTop;
    const bottom = top + opt.offsetHeight;
    if (top < el.ddList.scrollTop) el.ddList.scrollTop = top;
    else if (bottom > el.ddList.scrollTop + el.ddList.clientHeight) el.ddList.scrollTop = bottom - el.ddList.clientHeight;
  }

  function openDropdown() {
    if (dd.open) return;
    dd.open = true;
    el.dd.classList.add('is-open');
    el.ddTrigger.setAttribute('aria-expanded', 'true');
    setActiveOption(indexInCat(state.itemId));
    el.ddList.focus({ preventScroll: true });
  }

  function closeDropdown(returnFocus) {
    if (!dd.open) return;
    dd.open = false;
    el.dd.classList.remove('is-open');
    el.ddTrigger.setAttribute('aria-expanded', 'false');
    el.ddList.removeAttribute('aria-activedescendant');
    ddOptions().forEach((o) => o.classList.remove('is-active'));
    if (returnFocus) el.ddTrigger.focus({ preventScroll: true });
  }

  function chooseOption(id) {
    closeDropdown(true);
    if (id !== state.itemId) setItem(id, true, 'dropdown');
  }

  el.ddTrigger.addEventListener('click', () => (dd.open ? closeDropdown(false) : openDropdown()));

  el.ddTrigger.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      openDropdown();
    }
  });

  el.ddList.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); setActiveOption(dd.active + 1); break;
      case 'ArrowUp':   e.preventDefault(); setActiveOption(dd.active - 1); break;
      case 'Home':      e.preventDefault(); setActiveOption(0); break;
      case 'End':       e.preventDefault(); setActiveOption(ddOptions().length - 1); break;
      case 'Enter':
      case ' ': {
        e.preventDefault();
        const opt = ddOptions()[dd.active];
        if (opt) chooseOption(opt.dataset.id);
        break;
      }
      case 'Escape': e.preventDefault(); closeDropdown(true); break;
      case 'Tab': closeDropdown(false); break;
      default: break;
    }
  });

  el.ddList.addEventListener('click', (e) => {
    const opt = e.target.closest('.dd-option');
    if (opt) chooseOption(opt.dataset.id);
  });

  el.ddList.addEventListener('mouseover', (e) => {
    const opt = e.target.closest('.dd-option');
    if (opt) setActiveOption(ddOptions().indexOf(opt));
  });

  document.addEventListener('pointerdown', (e) => {
    if (dd.open && !el.dd.contains(e.target)) closeDropdown(false);
  });

  /* ==========================================================
     Pickup-time dropdown – same design & keyboard behaviour as the
     item dropdown. The hidden <select id="pickup"> keeps the form value.
     ========================================================== */
  const pk = {
    root: $('#pickup-dropdown'),
    field: $('#pickup-dropdown').closest('.field'),
    trigger: $('#pickup-trigger'),
    value: $('#pickup-value'),
    list: $('#pickup-list'),
    open: false,
    active: 0,
  };
  const pkOptions = () => $$('.pickup-option', pk.list);

  function syncPickup() {
    pk.value.textContent = t('time_' + state.pickup);
    pkOptions().forEach((opt) => {
      opt.setAttribute('aria-selected', String(opt.dataset.value === state.pickup));
    });
    el.pickup.value = state.pickup;
  }

  function setPickupActive(i) {
    const opts = pkOptions();
    if (!opts.length) return;
    pk.active = Math.max(0, Math.min(opts.length - 1, i));
    opts.forEach((o, k) => o.classList.toggle('is-active', k === pk.active));
    pk.list.setAttribute('aria-activedescendant', opts[pk.active].id);
  }

  function openPickup() {
    if (pk.open) return;
    pk.open = true;
    pk.root.classList.add('is-open');
    pk.field.classList.add('dd-open');
    pk.trigger.setAttribute('aria-expanded', 'true');
    setPickupActive(pkOptions().findIndex((o) => o.dataset.value === state.pickup));
    pk.list.focus({ preventScroll: true });
  }

  function closePickup(returnFocus) {
    if (!pk.open) return;
    pk.open = false;
    pk.root.classList.remove('is-open');
    pk.field.classList.remove('dd-open');
    pk.trigger.setAttribute('aria-expanded', 'false');
    pk.list.removeAttribute('aria-activedescendant');
    pkOptions().forEach((o) => o.classList.remove('is-active'));
    if (returnFocus) pk.trigger.focus({ preventScroll: true });
  }

  function choosePickup(value) {
    closePickup(true);
    state.pickup = value;
    syncPickup();
    el.waBtn.href = buildWhatsAppUrl();
  }

  pk.trigger.addEventListener('click', () => (pk.open ? closePickup(false) : openPickup()));

  pk.trigger.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      openPickup();
    }
  });

  pk.list.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); setPickupActive(pk.active + 1); break;
      case 'ArrowUp':   e.preventDefault(); setPickupActive(pk.active - 1); break;
      case 'Home':      e.preventDefault(); setPickupActive(0); break;
      case 'End':       e.preventDefault(); setPickupActive(pkOptions().length - 1); break;
      case 'Enter':
      case ' ': {
        e.preventDefault();
        const opt = pkOptions()[pk.active];
        if (opt) choosePickup(opt.dataset.value);
        break;
      }
      case 'Escape': e.preventDefault(); closePickup(true); break;
      case 'Tab': closePickup(false); break;
      default: break;
    }
  });

  pk.list.addEventListener('click', (e) => {
    const opt = e.target.closest('.pickup-option');
    if (opt) choosePickup(opt.dataset.value);
  });

  pk.list.addEventListener('mouseover', (e) => {
    const opt = e.target.closest('.pickup-option');
    if (opt) setPickupActive(pkOptions().indexOf(opt));
  });

  document.addEventListener('pointerdown', (e) => {
    if (pk.open && !pk.root.contains(e.target)) closePickup(false);
  });

  /* ==========================================================
     Single source of truth: select an item
     source: 'init' | 'dropdown' | 'swiper' | 'button' | 'dot' | 'category'
     ========================================================== */
  function setItem(id, animate, source) {
    const item = byId(id);
    if (!item) return;
    state.itemId = id;

    // Dynamic color: page + order card (CSS, 0.6s) and the cup filter (JS)
    el.body.dataset.mood = item.mood;
    el.img.style.filter = item.filter;
    if (el.themeMeta) el.themeMeta.setAttribute('content', item.bg);

    refreshPreview();
    syncDropdown();
    if (source !== 'swiper') slider.goTo(indexInCat(id), animate);
    updateNav();
    refreshAll();

    if (animate && !reduceMotion && el.img.animate) {
      el.img.animate(
        [
          { opacity: 0.55, transform: 'scale(0.92) rotate(-3deg)' },
          { opacity: 1, transform: 'scale(1) rotate(0deg)' },
        ],
        { duration: 650, easing: 'cubic-bezier(0.22, 0.8, 0.24, 1)' }
      );
    }
  }

  function goRelative(delta) {
    const list = itemsInCat();
    const next = list[slider.index() + delta];
    if (next) setItem(next.id, true, 'button');
  }

  el.prevBtn.addEventListener('click', () => goRelative(-1));
  el.nextBtn.addEventListener('click', () => goRelative(1));

  el.dots.addEventListener('click', (e) => {
    const dot = e.target.closest('.swipe-dot');
    if (!dot) return;
    const item = itemsInCat()[Number(dot.dataset.index)];
    if (item && item.id !== state.itemId) setItem(item.id, true, 'dot');
  });

  /* ---------- Category toggle ---------- */
  function setCategory(cat) {
    state.category = cat;
    el.segmented.dataset.active = cat;
    el.catRadios.forEach((r) => { r.checked = r.value === cat; });
    closeDropdown(false);

    // Milk & shot only make sense for drinks
    $$('.check').forEach((label) => {
      const key = label.dataset.extra;
      const hide = cat === 'food' && EXTRAS[key].drinksOnly;
      label.hidden = hide;
      if (hide && state.extras.has(key)) {
        state.extras.delete(key);
        $('input', label).checked = false;
        label.classList.remove('is-checked');
      }
    });

    // Keep the selected item if it belongs here, otherwise jump to the first one
    const keep = currentItem().cat === cat ? state.itemId : itemsInCat()[0].id;
    state.itemId = keep;

    rebuilding = true;
    renderItems();
    rebuilding = false;
    setItem(keep, true, 'category');
  }

  /* ---------- WhatsApp ---------- */
  function buildWhatsAppUrl() {
    const extras = activeExtras().map((k) => t(EXTRAS[k].key)).join(', ') || t('none');
    const message = fill(t('wa_message'), {
      name: state.name.trim().slice(0, 60),
      time: t('time_' + state.pickup),
      item: currentItem().name[state.lang],
      extras,
      total: money(totalCents()),
    });
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
  }

  function refreshAll() {
    refreshSummary();
    el.waBtn.href = buildWhatsAppUrl();
  }

  /* ---------- Language ---------- */
  function applyTranslations() {
    document.documentElement.lang = state.lang;
    document.title = t('title');
    if (el.descMeta) el.descMeta.setAttribute('content', t('meta_desc'));

    $$('[data-i18n]').forEach((node) => { node.textContent = t(node.dataset.i18n); });
    $$('[data-i18n-ph]').forEach((node) => { node.setAttribute('placeholder', t(node.dataset.i18nPh)); });
    $$('[data-i18n-aria]').forEach((node) => { node.setAttribute('aria-label', t(node.dataset.i18nAria)); });

    el.langSwitch.dataset.active = state.lang;
    el.langBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === state.lang)));

    refreshItemTexts();
    refreshPreview();
    syncDropdown();
    syncPickup();
    refreshExtraPrices();
    if (!el.nameError.hidden) el.nameError.textContent = t('name_error');
    refreshAll();
  }

  function setLang(lang) {
    if (!I18N[lang] || lang === state.lang) return;
    state.lang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage unavailable */ }
    applyTranslations();
  }

  /* ---------- Validation ---------- */
  function showNameError() {
    el.nameError.textContent = t('name_error');
    el.nameError.hidden = false;
    el.nameField.classList.add('has-error');
    el.nameField.classList.remove('shake');
    void el.nameField.offsetWidth; // restart animation
    el.nameField.classList.add('shake');
    el.nameInput.setAttribute('aria-invalid', 'true');
  }

  function clearNameError() {
    el.nameError.hidden = true;
    el.nameField.classList.remove('has-error', 'shake');
    el.nameInput.removeAttribute('aria-invalid');
  }

  /* ---------- Events ---------- */
  el.langBtns.forEach((btn) => btn.addEventListener('click', () => setLang(btn.dataset.lang)));

  el.catRadios.forEach((radio) => radio.addEventListener('change', () => {
    if (radio.checked && radio.value !== state.category) setCategory(radio.value);
  }));

  el.checks.forEach((label) => {
    const input = $('input', label);
    input.addEventListener('change', () => {
      if (input.checked) state.extras.add(input.value); else state.extras.delete(input.value);
      label.classList.toggle('is-checked', input.checked);
      refreshAll();
    });
  });

  el.nameInput.addEventListener('input', () => {
    state.name = el.nameInput.value;
    if (state.name.trim()) clearNameError();
    el.waBtn.href = buildWhatsAppUrl();
  });

  el.pickup.addEventListener('change', () => {
    state.pickup = el.pickup.value;
    el.waBtn.href = buildWhatsAppUrl();
  });

  el.form.addEventListener('submit', (e) => e.preventDefault());

  el.waBtn.addEventListener('click', (e) => {
    if (!state.name.trim()) {
      e.preventDefault();
      showNameError();
      el.nameInput.focus({ preventScroll: false });
      return;
    }
    el.waBtn.href = buildWhatsAppUrl();
  });

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const nodes = $$('.reveal');
    if (!('IntersectionObserver' in window) || reduceMotion) {
      nodes.forEach((n) => n.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    nodes.forEach((n) => io.observe(n));
  }

  /* ---------- Init ---------- */
  function init() {
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    state.lang = I18N[saved] ? saved : DEFAULT_LANG;

    renderItems();                 // slides + dots + dropdown options for the default category
    slider.init();                 // Swiper attaches to the rendered slides
    setItem(state.itemId, false, 'init');
    applyTranslations();
    initReveal();
  }

  init();
})();