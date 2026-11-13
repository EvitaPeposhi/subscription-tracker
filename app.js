import {
    getStatus,
    loadSubscriptions
} from "https://cdn.jsdelivr.net/gh/EvitaPeposhi/subscription-tracker@main/js-library/library.js";

// Load saved subscriptions
const subscriptions = loadSubscriptions();

// Count all subscriptions
const total = subscriptions.length;

// Count expired subscriptions
let expired = 0;

subscriptions.forEach(function(subscription) {
    if (getStatus(subscription.renewalDate) === "Expired") {
        expired++;
    }
});

// Display the numbers on the dashboard
document.getElementById("totalSubscriptions").textContent = total;

document.getElementById("expiredSubscriptions").textContent = expired;
