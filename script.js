// --- Data (Replace with data fetched from backend in a real app) ---
const menuItems = [
    { id: 1, name: "Veg Pizza", price: 150, category: "veg", description: "Cheesy pizza with assorted veggies.", ingredients: ["Flour", "Cheese", "Tomato", "Onion", "Capsicum"], calories: 450, image: "https://via.placeholder.com/300x200/90EE90/000000?text=Veg+Pizza" },
    { id: 2, name: "Chicken Burger", price: 120, category: "non-veg", description: "Juicy chicken patty in a soft bun.", ingredients: ["Bun", "Chicken Patty", "Lettuce", "Mayo"], calories: 550, image: "https://via.placeholder.com/300x200/FFDAB9/000000?text=Chicken+Burger" },
    { id: 3, name: "Paneer Sandwich", price: 80, category: "veg", description: "Grilled sandwich with spiced paneer filling.", ingredients: ["Bread", "Paneer", "Spices", "Onion"], calories: 350, image: "https://via.placeholder.com/300x200/90EE90/000000?text=Paneer+Sandwich" },
    { id: 4, name: "Veg Noodles", price: 70, category: "veg", description: "Stir-fried noodles with vegetables.", ingredients: ["Noodles", "Carrot", "Cabbage", "Soy Sauce"], calories: 400, image: "https://via.placeholder.com/300x200/90EE90/000000?text=Veg+Noodles" },
    { id: 5, name: "Samosa (2 pcs)", price: 30, category: "snack", description: "Crispy pastry filled with spiced potatoes.", ingredients: ["Flour", "Potato", "Peas", "Spices"], calories: 250, image: "https://via.placeholder.com/300x200/FFFACD/000000?text=Samosa" },
    { id: 6, name: "Orange Juice", price: 40, category: "drink", description: "Freshly squeezed orange juice.", ingredients: ["Orange"], calories: 120, image: "https://via.placeholder.com/300x200/FFB6C1/000000?text=Orange+Juice" },
    { id: 7, name: "Masala Dosa", price: 90, category: "veg", description: "South Indian crepe with potato filling.", ingredients: ["Rice", "Lentils", "Potato"], calories: 380, image: "https://via.placeholder.com/300x200/90EE90/000000?text=Masala+Dosa" },
    { id: 8, name: "Iced Tea", price: 35, category: "drink", description: "Refreshing lemon iced tea.", ingredients: ["Tea", "Lemon", "Sugar"], calories: 90, image: "https://via.placeholder.com/300x200/FFB6C1/000000?text=Iced+Tea" },
     // Add more items with details
];

const timeSlots = ["12:00 PM - 12:15 PM", "12:15 PM - 12:30 PM", "12:30 PM - 12:45 PM", "12:45 PM - 01:00 PM", "01:00 PM - 01:15 PM", "01:15 PM - 01:30 PM"];

// --- DOM Elements ---
// It's good practice to ensure the DOM is loaded before selecting elements
let menuList, orderFoodSelect, orderTimeSlotSelect, feedbackFoodSelect, orderMessage, feedbackMessage, loginMessage, starRatingContainer, feedbackRatingInput, queueHeatmap, recommendationText, allergyAlert;

function initializeDOMElements() {
    menuList = document.getElementById("menu-items");
    orderFoodSelect = document.getElementById("order-food");
    orderTimeSlotSelect = document.getElementById("order-timeslot");
    feedbackFoodSelect = document.getElementById("feedback-food");
    orderMessage = document.getElementById("order-message");
    feedbackMessage = document.getElementById("feedback-message");
    loginMessage = document.getElementById("login-message");
    starRatingContainer = document.getElementById("star-rating");
    feedbackRatingInput = document.getElementById("feedback-rating");
    queueHeatmap = document.getElementById('queue-heatmap');
    recommendationText = document.getElementById('recommendation-text');
    allergyAlert = document.getElementById('allergy-alert');
}


// --- Functions ---

// Render Menu Items
function renderMenu(filter = 'all') {
    // Ensure menuList is available
    if (!menuList) return;

    menuList.innerHTML = ""; // Clear existing items

    const filteredItems = menuItems.filter(item => filter === 'all' || item.category === filter);

    if (filteredItems.length === 0) {
        menuList.innerHTML = `<p class="text-center text-gray-500 col-span-full">No items found for this category.</p>`;
        return;
    }

    filteredItems.forEach(item => {
        const div = document.createElement("div");
        div.className = "bg-white rounded-lg shadow-md overflow-hidden flex flex-col border border-gray-200 hover:shadow-xl transition-shadow duration-300";
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover">
            <div class="p-4 flex flex-col flex-grow">
                <h3 class="text-xl font-semibold mb-2 text-green-700">${item.name}</h3>
                <p class="text-gray-600 text-sm mb-3 flex-grow">${item.description}</p>
                <p class="text-sm text-gray-500 mb-1">Category: ${item.category}</p>
                <p class="text-sm text-gray-500 mb-3">Calories: ~${item.calories}</p>
                <!-- Add Ingredients/Allergens Button (Optional) -->
                <!-- <button onclick="alert('Ingredients: ${item.ingredients.join(', ')}')" class="text-xs text-blue-500 hover:underline mb-3">View Ingredients</button> -->
                <div class="flex justify-between items-center mt-auto">
                    <p class="text-lg font-bold text-green-600">₹${item.price}</p>
                    <button onclick="addItemToOrderForm('${item.id}')" class="bg-green-500 text-white py-1 px-3 rounded-full hover:bg-green-600 text-sm transition duration-300">Order</button>
                </div>
            </div>
        `;
        menuList.appendChild(div);
    });

    // Highlight active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-green-500', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
    });
    const activeButton = document.querySelector(`.filter-btn[onclick="renderMenu('${filter}')"]`);
    if (activeButton) {
        activeButton.classList.remove('bg-gray-200', 'text-gray-700');
        activeButton.classList.add('bg-green-500', 'text-white');
    }
}

// Populate Dropdowns
function populateDropdowns() {
    // Ensure elements are available
    if (!orderFoodSelect || !feedbackFoodSelect || !orderTimeSlotSelect) return;

    // Order Form Food Select
    orderFoodSelect.innerHTML = '<option value="">-- Select Food Item --</option>'; // Reset
    feedbackFoodSelect.innerHTML = '<option value="">-- Select Food Item You Had --</option>'; // Reset
    menuItems.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id; // Use ID for easier lookup
        option.textContent = `${item.name} - ₹${item.price}`;
        orderFoodSelect.appendChild(option.cloneNode(true));
        feedbackFoodSelect.appendChild(option);
    });

     // Order Form Time Slots
     orderTimeSlotSelect.innerHTML = '<option value="">-- Select Pickup Time Slot --</option>'; // Reset
     timeSlots.forEach(slot => {
         const option = document.createElement("option");
         option.value = slot;
         option.textContent = slot;
         // Optional: Disable past slots (requires more complex date logic)
         orderTimeSlotSelect.appendChild(option);
     });
}

// Add Item to Order Form directly
function addItemToOrderForm(itemId) {
     if (!orderFoodSelect) return;
     orderFoodSelect.value = itemId;
     // Optionally scroll to the order section
     const orderSection = document.getElementById('order');
     if(orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
     }
     // Trigger allergy check if an item is selected
     checkAllergies();
}

// Submit Order (Simulation)
function submitOrder() {
    if (!orderMessage) return; // Ensure element exists

    const nameInput = document.getElementById("order-name");
    const foodSelect = document.getElementById("order-food");
    const quantityInput = document.getElementById("order-quantity");
    const timeSlotSelect = document.getElementById("order-timeslot");
    const paymentSelect = document.getElementById("order-payment");

    const name = nameInput ? nameInput.value.trim() : "";
    const foodId = foodSelect ? foodSelect.value : "";
    const quantity = quantityInput ? quantityInput.value : "";
    const timeSlot = timeSlotSelect ? timeSlotSelect.value : "";
    const paymentMethod = paymentSelect ? paymentSelect.value : "pay-at-counter";


    orderMessage.textContent = ""; // Clear message first
    orderMessage.classList.remove('text-red-600', 'text-green-600'); // Clear previous status colors

    if (name === "" || foodId === "" || quantity === "" || timeSlot === "") {
        orderMessage.textContent = "⚠️ Please fill in all fields!";
        orderMessage.classList.add('text-red-600');
        return;
    }

    if (quantity <= 0) {
        orderMessage.textContent = "⚠️ Quantity must be greater than zero!";
         orderMessage.classList.add('text-red-600');
        return;
    }

    const selectedFood = menuItems.find(item => item.id == foodId); // Use == for loose comparison as value might be string
    if (!selectedFood) {
         orderMessage.textContent = "⚠️ Invalid food item selected.";
         orderMessage.classList.add('text-red-600');
         return;
    }

    orderMessage.textContent = `✅ Order placed for ${quantity} x ${selectedFood.name} for ${name}. Pickup slot: ${timeSlot}. Payment: ${paymentMethod.replace('-', ' ')}.`;
    orderMessage.classList.add('text-green-600');
    console.log("Simulated Order:", { name, foodId: selectedFood.id, foodName: selectedFood.name, quantity, timeSlot, paymentMethod });

     // Clear form (optional)
     // if (nameInput) nameInput.value = "";
     // if (foodSelect) foodSelect.value = "";
     // if (quantityInput) quantityInput.value = "";
     // if (timeSlotSelect) timeSlotSelect.value = "";
     // if (paymentSelect) paymentSelect.value = "pay-at-counter";
     // if (allergyAlert) allergyAlert.classList.add('hidden');

     // In a real app, send this data to the backend here.
}

// Submit Feedback (Simulation)
function submitFeedback() {
    if (!feedbackMessage || !feedbackRatingInput) return; // Ensure elements exist

    const foodSelect = document.getElementById("feedback-food");
    const commentArea = document.getElementById("feedback-comment");
    const photoInput = document.getElementById("feedback-photo");

    const foodId = foodSelect ? foodSelect.value : "";
    const rating = feedbackRatingInput.value;
    const comment = commentArea ? commentArea.value.trim() : "";
    const photoFile = photoInput ? photoInput.files[0] : null; // Get file object

    feedbackMessage.textContent = ""; // Clear message first
    feedbackMessage.classList.remove('text-red-600', 'text-green-600');

    if (foodId === "" || rating === "0") {
        feedbackMessage.textContent = "⚠️ Please select a food item and provide a rating.";
        feedbackMessage.classList.add('text-red-600');
        return;
    }

     const selectedFood = menuItems.find(item => item.id == foodId);
     if (!selectedFood) {
         feedbackMessage.textContent = "⚠️ Invalid food item selected.";
         feedbackMessage.classList.add('text-red-600');
         return;
     }

    feedbackMessage.textContent = `✅ Thank you for your feedback on ${selectedFood.name}! Rating: ${rating} stars.`;
     feedbackMessage.classList.add('text-green-600');
    console.log("Simulated Feedback:", { foodId: selectedFood.id, foodName: selectedFood.name, rating, comment, photo: photoFile ? photoFile.name : 'No photo' });

    // Clear form (optional)
    // if (foodSelect) foodSelect.value = "";
    // if (feedbackRatingInput) feedbackRatingInput.value = "0";
    // if (commentArea) commentArea.value = "";
    // if (photoInput) photoInput.value = null; // Clear file input
    // // Reset stars visual state
    // if (starRatingContainer) {
    //      starRatingContainer.querySelectorAll('span').forEach(s => s.classList.remove('selected'));
    // }

    // In a real app, send this data (including photo upload if needed) to the backend.
}

// Handle Star Rating Interaction
function setupStarRating() {
    if (!starRatingContainer || !feedbackRatingInput) return;

    starRatingContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN' && e.target.dataset.value) {
            const ratingValue = e.target.dataset.value;
            feedbackRatingInput.value = ratingValue;

            // Update visual state of stars
            const stars = starRatingContainer.querySelectorAll('span');
            stars.forEach(star => {
                star.classList.remove('selected');
                if (parseInt(star.dataset.value) <= parseInt(ratingValue)) {
                    star.classList.add('selected');
                }
            });
        }
    });
    // Add hover effect for stars (relies on CSS for visual, JS sets final state on click)
     // Note: Complex hover logic (coloring stars up to the hovered one) is often better handled
     // with JS if the pure CSS approach isn't sufficient or becomes too complex.
     // The provided CSS handles basic hover coloring.
}

// Login (Simple Simulation)
function login() {
    if (!loginMessage) return; // Ensure element exists

    const usernameInput = document.getElementById("login-username");
    const passwordInput = document.getElementById("login-password");

    const username = usernameInput ? usernameInput.value : "";
    const password = passwordInput ? passwordInput.value : "";

    loginMessage.textContent = ""; // Clear previous message
    loginMessage.classList.remove('text-red-600', 'text-green-600');

    // **VERY IMPORTANT**: This is NOT secure. Use a backend for real authentication.
    if (username === "admin" && password === "password") {
        loginMessage.textContent = "✅ Login successful! (Redirecting in a real app...)";
        loginMessage.classList.add('text-green-600');
        // In a real app: window.location.href = "admin_dashboard.html";
    } else if (username === "staff" && password === "staffpass") {
         loginMessage.textContent = "✅ Staff login successful! (Redirecting...)";
         loginMessage.classList.add('text-green-600');
         // In a real app: window.location.href = "staff_dashboard.html";
    } else {
        loginMessage.textContent = "❌ Invalid credentials.";
         loginMessage.classList.add('text-red-600');
    }
}

// Update Queue Status (Simulation)
function updateQueueStatus() {
     if (!queueHeatmap) return; // Ensure element exists

     const hour = new Date().getHours();
     let statusText = 'Low';
     let statusClass = 'heatmap-green';

     if (hour >= 12 && hour < 14) { // Peak time: 12 PM to 2 PM
         statusText = 'Crowded';
         statusClass = 'heatmap-red';
     } else if (hour === 11 || hour === 14 || hour === 18) { // Moderate: 11 AM, 2 PM, 6 PM
         statusText = 'Moderate';
         statusClass = 'heatmap-yellow';
     }

     queueHeatmap.textContent = statusText;
     queueHeatmap.className = 'p-4 rounded-md text-lg font-bold transition-colors duration-500'; // Reset classes
     queueHeatmap.classList.add(statusClass);

     // In a real app, fetch from GET /api/queue/status
}

// Show AI Recommendation (Simple Simulation)
function showRecommendation() {
     if (!recommendationText) return; // Ensure element exists

     if (menuItems.length > 0) {
         const randomIndex = Math.floor(Math.random() * menuItems.length);
         const recommendedItem = menuItems[randomIndex];
         // Using innerHTML to allow strong tag
         recommendationText.innerHTML = `Based on popular choices, you might enjoy the <strong class="text-blue-800">${recommendedItem.name}</strong> today!`;
     } else {
         recommendationText.textContent = "Loading recommendations...";
     }
     // In a real app: Fetch from backend API
}

// Update Sustainability Stats (Simulation)
function updateSustainabilityStats() {
    const foodSavedEl = document.getElementById('food-saved');
    const topStudentEl = document.getElementById('top-student');

    if (foodSavedEl) {
        foodSavedEl.textContent = `${(Math.random() * 10 + 5).toFixed(1)} kg`;
    }
    if (topStudentEl) {
        const students = ["Amit S.", "Priya K.", "Rahul V.", "Sneha M."];
        topStudentEl.textContent = students[Math.floor(Math.random() * students.length)];
    }
    // In real app: fetch from backend API
}

 // Allergy Check Simulation
 function checkAllergies() {
    if (!allergyAlert || !orderFoodSelect) return; // Ensure elements exist

    const selectedFoodId = orderFoodSelect.value;
    if (!selectedFoodId) {
         allergyAlert.classList.add('hidden');
         return;
    }

    const selectedFood = menuItems.find(item => item.id == selectedFoodId);
    if (!selectedFood) {
        allergyAlert.classList.add('hidden');
        return;
    }

    // **SIMULATION**: Replace with actual user allergy data and item allergen data
    const userAllergies = ['nuts']; // Hardcoded for demo
    // Let's pretend burger has nuts and pizza has gluten for demo
    let itemPotentialAllergens = [];
    if (selectedFood.name.toLowerCase().includes("burger")) itemPotentialAllergens = ['nuts'];
    if (selectedFood.name.toLowerCase().includes("pizza")) itemPotentialAllergens = ['gluten'];

    const conflict = userAllergies.some(allergy => itemPotentialAllergens.includes(allergy));

    if (conflict) {
         allergyAlert.textContent = `⚠️ Warning: This item might contain allergens you are sensitive to (${userAllergies.join(', ')}). Please check ingredients.`;
         allergyAlert.classList.remove('hidden');
    } else {
         allergyAlert.classList.add('hidden');
    }
 }

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    // Get references to DOM elements now that the DOM is ready
    initializeDOMElements();

    // Initial setup calls
    renderMenu('all');
    populateDropdowns();
    updateQueueStatus();
    showRecommendation();
    updateSustainabilityStats();
    setupStarRating(); // Set up event listeners for star rating

     // Add event listener to food select for allergy check AFTER it's populated
     if (orderFoodSelect) {
        orderFoodSelect.addEventListener('change', checkAllergies);
     } else {
        console.error("Order food select element not found");
     }


    // Set up periodic updates
    setInterval(updateQueueStatus, 60000); // Every 1 minute
    setInterval(showRecommendation, 300000); // Every 5 minutes
    setInterval(updateSustainabilityStats, 600000); // Every 10 minutes

     // Expose functions to global scope IF they are called by inline onclick handlers
     // If you remove inline onclick, you don't need this, but you'd add event listeners here instead.
     window.renderMenu = renderMenu;
     window.addItemToOrderForm = addItemToOrderForm;
     window.submitOrder = submitOrder;
     window.submitFeedback = submitFeedback;
     window.login = login;

});