
import {
    saveSubscriptions,
    loadSubscriptions,
    generateId
} from "./js-library/library.js";

// Get the form
const form = document.getElementById("subscriptionForm");

// Handle form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Create a subscription object
    const subscription = {
        id: generateId(),
        service: document.getElementById("service").value.trim(),
        provider: document.getElementById("provider").value.trim(),
        subscriber: document.getElementById("subscriber").value.trim(),
        renewalDate: document.getElementById("renewalDate").value,
        category: document.getElementById("category").value
    };

    // Check that all fields are completed
    if (
        !subscription.service ||
        !subscription.provider ||
        !subscription.subscriber ||
        !subscription.renewalDate ||
        !subscription.category
    ) {
        alert("Please fill in all fields.");
        return;
    }

    // Load existing subscriptions
    const subscriptions = loadSubscriptions();

    // Add the new subscription
    subscriptions.push(subscription);

    // Save the updated list
    saveSubscriptions(subscriptions);

    // Navigate to the subscriptions page
    window.location.href = "subscriptions.html";
});
