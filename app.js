
import {
    getStatus,
    formatDate,
    saveSubscriptions,
    loadSubscriptions,
    generateId
} from "./js-library/library.js";

// Get HTML elements
const form = document.getElementById("subscriptionForm");
const table = document.getElementById("subscriptionTable");
const totalElement = document.getElementById("totalSubscriptions");
const expiredElement = document.getElementById("expiredSubscriptions");

// Load previously saved subscriptions
let subscriptions = loadSubscriptions();

// Update the dashboard and table
function updateDisplay() {
    table.replaceChildren();

    let expiredCount = 0;

    subscriptions.forEach(function(subscription) {
        const status = getStatus(subscription.renewalDate);

        if (status === "Expired") {
            expiredCount++;
        }

        const row = document.createElement("tr");

        // Display subscription information
        const values = [
            subscription.service,
            subscription.provider,
            subscription.subscriber,
            formatDate(subscription.renewalDate),
            subscription.category
        ];

        values.forEach(function(value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        // Display subscription status
        const statusCell = document.createElement("td");
        const statusBadge = document.createElement("span");

        statusBadge.textContent = status;
        statusBadge.classList.add("badge");

        if (status === "Expired") {
            statusBadge.classList.add("badge-expired");
        } else {
            statusBadge.classList.add("badge-active");
        }

        statusCell.appendChild(statusBadge);
        row.appendChild(statusCell);

        // Create delete button
        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.classList.add("button", "button-danger");

        deleteButton.addEventListener("click", function() {
            deleteSubscription(subscription.id);
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        table.appendChild(row);
    });

    // Display a message if there are no subscriptions
    if (subscriptions.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 7;
        cell.textContent = "No subscriptions added yet.";
        cell.classList.add("empty-state");

        row.appendChild(cell);
        table.appendChild(row);
    }

    // Update dashboard numbers
    totalElement.textContent = subscriptions.length;
    expiredElement.textContent = expiredCount;
}

// Add a new subscription
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const subscription = {
        id: generateId(),
        service: document.getElementById("service").value.trim(),
        provider: document.getElementById("provider").value.trim(),
        subscriber: document.getElementById("subscriber").value.trim(),
        renewalDate: document.getElementById("renewalDate").value,
        category: document.getElementById("category").value
    };

    // Check that all fields contain valid values
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

    subscriptions.push(subscription);

    saveSubscriptions(subscriptions);
    updateDisplay();

    form.reset();
});

// Delete a subscription
function deleteSubscription(id) {
    subscriptions = subscriptions.filter(function(subscription) {
        return subscription.id !== id;
    });

    saveSubscriptions(subscriptions);
    updateDisplay();
}

// Display subscriptions when the page opens
updateDisplay();
