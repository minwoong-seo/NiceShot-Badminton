/**
 * NiceShot Price List – Edit prices, colors (dots), labels, and availability here.
 * Dots: "red" | "green" | "yellow" | "white" | "grey"
 */

const PRICE_LIST_DATA = {
  strings: [
    [
      { name: "AEROBITE", dots: ["red", "white"], price: 23, available: true },
      { name: "BG-80", dots: ["red", "white"], price: 18, highlight: true, label: "BEST SELLER", available: false },
      { name: "BG-80P", dots: ["red", "white"], price: 20, available: true },
      { name: "BG-66U", dots: ["green", "white"], price: 18, available: true },
      { name: "EX-63", dots: ["yellow", "white"], price: 22, highlight: true, label: "RECOMMENDED", available: true },
      { name: "EX-65", dots: ["yellow", "white"], price: 22, available: true },
      { name: "ABBT", dots: ["red", "grey"], price: 20, available: true },
    ],
    [
      { name: "NANOGY-95", dots: ["yellow", "white"], price: 18, available: true },
      { name: "BG-65", dots: ["white"], price: 15, available: true },
      { name: "BG-65TI", dots: ["white"], price: 16, highlight: true, label: "DURABLE BEAST", available: true },
      { name: "EX-68", dots: ["white"], price: 22, available: true },
    ],
  ],

  otherServices: [
    { name: "OWN STRING PROVIDED", price: 10 },
    { name: "Grommet set", price: 5 },
    { name: "GRIP UPGRADE", price: 5, label: "BOX OF 5", highlight: true },
  ],

  notice: "Services are typically completed within 5 working days, depending on queue. Express service (£3) available for next working day.",

  device: {
    title: "Stringing machine: Yonex Precision 3.2",
    subtitle: "Latest Yonex stringing technology",
    placeholderLine1: "YONEX",
    placeholderLine2: "PRECISION 3.2",
  },

  contact: {
    whatsappNumber: "447881056665",
    displayText: "WhatsApp: 07881 056665",
  },
};

(function () {
  function formatPrice(price) {
    return "£" + price;
  }

  function renderDots(dots) {
    if (!dots || dots.length === 0) return "";
    return dots
      .map(function (d) {
        return '<span class="dot ' + d + '"></span>';
      })
      .join("");
  }

  function renderStringRow(item) {
    if (item.available === false) return "";
    var rowClass = "string-row" + (item.highlight ? " highlight" : "");
    var star = item.highlight ? '<span class="star">★</span>' : "";
    var label = item.label ? '<span class="string-label">' + item.label + "</span>" : "";
    var dotsHtml = renderDots(item.dots);
    var dotsWrap = dotsHtml ? '<span class="string-dots">' + dotsHtml + "</span>" : "";
    return (
      '<div class="' +
      rowClass +
      '">' +
      star +
      '<span class="string-name">' +
      item.name +
      "</span>" +
      dotsWrap +
      label +
      '<span class="string-price">' +
      formatPrice(item.price) +
      "</span>" +
      "</div>"
    );
  }

  function renderStringGroup(group) {
    var html = group.map(renderStringRow).filter(Boolean).join("");
    return html ? '<section class="string-list">' + html + "</section>" : "";
  }

  function renderOtherService(item) {
    var rowClass = "string-row" + (item.highlight ? " highlight" : "");
    var star = item.highlight ? '<span class="star">★</span>' : "";
    var label = item.label ? '<span class="string-label">' + item.label + "</span>" : "";
    return (
      '<div class="' +
      rowClass +
      '">' +
      star +
      '<span class="string-name">' +
      item.name +
      "</span>" +
      label +
      '<span class="string-price">' +
      formatPrice(item.price) +
      "</span>" +
      "</div>"
    );
  }

  function render() {
    var data = window.PRICE_LIST_DATA || PRICE_LIST_DATA;

    var stringsWrap = document.getElementById("strings-desktop-wrap");
    if (stringsWrap && data.strings) {
      var parts = [];
      data.strings.forEach(function (group, i) {
        var section = renderStringGroup(group);
        if (section) parts.push(section);
        if (i < data.strings.length - 1) parts.push('<div class="section-divider" aria-hidden="true"></div>');
      });
      stringsWrap.innerHTML = parts.join("");
    }

    var otherServices = document.getElementById("other-services");
    if (otherServices && data.otherServices) {
      var servicesHtml =
        renderOtherService(data.otherServices[0]) +
        '<div class="wavy-line"></div>' +
        data.otherServices
          .slice(1)
          .map(renderOtherService)
          .join("");
      otherServices.innerHTML = servicesHtml;
    }

    var noticeEl = document.getElementById("notice-text");
    if (noticeEl && data.notice) noticeEl.textContent = data.notice;

    var deviceTitle = document.getElementById("device-title");
    var deviceSubtitle = document.getElementById("device-subtitle");
    if (data.device) {
      if (deviceTitle) deviceTitle.textContent = data.device.title;
      if (deviceSubtitle) deviceSubtitle.textContent = data.device.subtitle;
    }

    var contactLink = document.getElementById("contact-link");
    if (contactLink && data.contact) {
      contactLink.href = "https://wa.me/" + data.contact.whatsappNumber;
      contactLink.textContent = data.contact.displayText;
    }

    var placeholder1 = document.getElementById("device-placeholder-line1");
    var placeholder2 = document.getElementById("device-placeholder-line2");
    if (data.device) {
      if (placeholder1) placeholder1.textContent = data.device.placeholderLine1 || "";
      if (placeholder2) placeholder2.textContent = data.device.placeholderLine2 || "";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
