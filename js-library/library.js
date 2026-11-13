
/* =========================
   SUBSCRIPTION TRACKER
   JAVASCRIPT LIBRARY
   ========================= */

// Check whether a subscription has expired
export function getStatus(renewalDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const renewal = new Date(renewalDate + "T00:00:00");

    if (renewal < today) {
        return "Expired";
    }

    return "Active";
}

// Format a date for display
export function formatDate(date) {
    const parts = date.split("-");

    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// Save subscriptions in browser storage
export function saveSubscriptions(subscriptions) {
    localStorage.setItem(
        "subscriptions",
        JSON.stringify(subscriptions)
    );
}

// Load saved subscriptions
export function loadSubscriptions() {
    const saved = localStorage.getItem("subscriptions");

    if (saved === null) {
        return [];
    }

    try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

// Generate a unique subscription ID
export function generateId() {
    return crypto.randomUUID();
}
