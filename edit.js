
import {
    loadSubscriptions,
    saveSubscriptions
} from "https://cdn.jsdelivr.net/gh/EvitaPeposhi/subscription-tracker@main/js-library/library.js";

// Get the subscription ID from the URL
const params = new URLSearchParams(window.location.search);
const subscriptionId = params.get("id");

// Load all subscriptions
let subscriptions = loadSubscriptions();

// Find the subscription we want to edit
const subscription = subscriptions.find(function(item) {
    return item.id === subscriptionId;
});

// Get the form
const form = document.getElementById("editForm");

// Check whether the subscription exists
if (!subscription) {

    alert("Subscription not found.");

    window.location.href = "subscriptions.html";

} else {

    // Fill the form with existing information
    document.getElementById("service").value = subscription.service;
    document.getElementById("provider").value = subscription.provider;
    document.getElementById("subscriber").value = subscription.subscriber;
    document.getElementById("renewalDate").value = subscription.renewalDate;
    document.getElementById("category").value = subscription.category;

    // Handle form submission
    form.addEventListener("submit", function(event) {

        event.preventDefault();

        // Update subscription information
        subscription.service = document.getElementById("service").value.trim();
        subscription.provider = document.getElementById("provider").value.trim();
        subscription.subscriber = document.getElementById("subscriber").value.trim();
        subscription.renewalDate = document.getElementById("renewalDate").value;
        subscription.category = document.getElementById("category").value;

        // Save updated subscriptions
        saveSubscriptions(subscriptions);

        // Return to subscriptions page
        window.location.href = "subscriptions.html";
    });
}
