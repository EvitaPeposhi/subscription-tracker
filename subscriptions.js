
import {
    getStatus,
    formatDate,
    saveSubscriptions,
    loadSubscriptions
} from "./js-library/library.js";

// Get the table
const table = document.getElementById("subscriptionTable");

// Load saved subscriptions
let subscriptions = loadSubscriptions();

// Display subscriptions
function updateDisplay() {
    table.replaceChildren();

    subscriptions.forEach(function(subscription) {

        const row = document.createElement("tr");

        // Subscription information
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

        // Subscription status
        const status = getStatus(subscription.renewalDate);

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

        
        // Action buttons
        const actionCell = document.createElement("td");

        // Edit button
        const editButton = document.createElement("button");

        editButton.textContent = "Edit";
        editButton.classList.add("button", "button-primary");

        editButton.addEventListener("click", function() {
            window.location.href = "edit.html?id=" + subscription.id;
        });

        actionCell.appendChild(editButton);

        // Delete button
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

    // Show message if there are no subscriptions
    if (subscriptions.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 7;
        cell.textContent = "No subscriptions added yet.";
        cell.classList.add("empty-state");

        row.appendChild(cell);
        table.appendChild(row);
    }
}

// Delete a subscription
function deleteSubscription(id) {

    subscriptions = subscriptions.filter(function(subscription) {
        return subscription.id !== id;
    });

    saveSubscriptions(subscriptions);

    updateDisplay();
}

// Display subscriptions when page opens
updateDisplay();
