
// --- Hotel Names Array (replace/add as needed) ---
const closeSellHotelNames = [
    "Amari Phuket",
    "Anantara Layan Phuket Resort",
    "Avani Ao Nang Krabi",
    "Bandara Beach Resort Phuket",
    "Bandara Pool Villas Phuket",
    "Crest Resort Phuket",
    "Diamond Cliff Resort",
    "Dinso Resort Phuket",
    "Dusit Thani Laguna Phuket",
    "Holiday Inn Express Phuket",
    "Hyatt Regency Phuket",
    "Innside By Melia Bangkok",
    "Kalima Resort Phuket",
    "Keemala Phuket",
    "Melia Chiang Mai",
    "Melia Koh Samui",
    "Mida Grande Resort Phuket",
    "Namaka Resort Kamala",
    "Nysa Hotel Bangkok",
    "Oceanfront Beach Resort Phuket",
    "Phuket Emerald Beach Resort",
    "Saii Laguna Phuket",
    "Siam Kempinski Bangkok",
    "Sinae Phuket Luxury Hotel",
    "Sri Panwa Phuket",
    "The Nai Harn Phuket",
    "The Naka Hotels Phuket",
    "The Nature Phuket",
    "Valia Hotel Bangkok",
    "Adam Krabi",
    "Panan Krabi Resort",
    "Sea Seeker Krabi Resort",
    "Ascott Thonglor Bangkok",
    "Ascott Embassy Bangkok",
    "Tribe Living Bangkok",
    "Ozo Phuket",
    "The Shore Katathani Phuket",
    "Avista Hideaway Phuket Patong",
    "Avista Grande Phuket Karon",
    "Anantara Mai Khao Phuket Villas",
    "Panwaburi Beachfront Resort Phuket",
    "Centara Karon Resort Phuket",
    "Sugar Marina Hotel CLIFFHANGER Krabi",
    "Sugar Marina Art Karon Phuket",
    "Marina Express Fisherman Aonang Krabi",
    "Sugar Marina Fashion Phuket",
    "Marina Gallery KACHA Phuket",
    "Marina MUAYTHAI Ta-iad Phuket",
    "Sugar Marina POP Phuket",
    "Sugar Marina SURF Phuket",
    "Thaya Hotel Bangkok",
    "The Berkeley Pratunam",
    "Siam At Siam Design Bangkok",
    "Seabed Grand Phuket",
    "Radisson Red Phuket",
    "Pamookkoo Resort",
    "Phuket Orchid Resort",
    "Avani Pattaya Resort",
    "Hotel Clover Phuket",
    "Arun Khiri Chiang Mai",
    "Ban Sainai Resort Krabi",
    "Jasmine Resort Bangkok",
    "Pipa Bangkok Sukhumvit 11",
    "Tribe Phuket Patong",
    "My Beach Resort Phuket",
    "Oakwood Studios Sukhumvit",
    "Splash Beach Resort",
    "Grande Centre Point Ratchadamri",
    "Andaman Beach Hotel Phuket",
    "The Aim Patong",
    "Oakwood Sukhumvit Thonglor",




    "Jasmine 59 Hotel",
];






























// --- Custom Searchable Hotel Selector ---
function renderHotelSelector() {
    const container = document.getElementById('hotelSelectorContainer');
    container.innerHTML = `
        <input type="text" class="hotel-search-input" placeholder="Search hotel..." autocomplete="off" />
        <div class="hotel-dropdown-list" style="display:none;"></div>
    `;
    const input = container.querySelector('.hotel-search-input');
    const dropdown = container.querySelector('.hotel-dropdown-list');
    let filtered = closeSellHotelNames.slice();
    let dropdownOpen = false;
    let activeIndex = -1;

    function showDropdown() {
        dropdown.style.display = 'block';
        dropdownOpen = true;
    }
    function hideDropdown() {
        dropdown.style.display = 'none';
        dropdownOpen = false;
        activeIndex = -1;
    }
    function renderList() {
        if (!filtered.length) {
            dropdown.innerHTML = `<div class="hotel-dropdown-empty">No hotels found</div>`;
            return;
        }
        dropdown.innerHTML = filtered.map((name, i) =>
            `<div class="hotel-dropdown-item${i === activeIndex ? ' active' : ''}" data-index="${i}">${name}</div>`
        ).join('');
    }
    function selectHotel(name) {
        input.value = name;
        hideDropdown();
        // Set currentHotel and trigger data load
        currentHotel = name;
        loadHotelData(name);

        // Update the hotel name title
        const hotelNameTitleElement = document.getElementById('currentHotelNameTitle');
        if (hotelNameTitleElement) {
            hotelNameTitleElement.textContent = name;
        }
    }
    input.addEventListener('input', () => {
        const val = input.value.trim().toLowerCase();
        filtered = closeSellHotelNames.filter(h => h.toLowerCase().includes(val));
        renderList();
        showDropdown();
    });
    input.addEventListener('click', () => {
        input.value = '';
        filtered = closeSellHotelNames.slice();
        activeIndex = -1;
        renderList();
        showDropdown();
    });
    input.addEventListener('focus', () => {
        filtered = closeSellHotelNames.filter(h => h.toLowerCase().includes(input.value.trim().toLowerCase()));
        renderList();
        showDropdown();
    });
    input.addEventListener('keydown', e => {
        if (!dropdownOpen) return;
        if (e.key === 'ArrowDown') {
            activeIndex = (activeIndex + 1) % filtered.length;
            renderList();
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            activeIndex = (activeIndex - 1 + filtered.length) % filtered.length;
            renderList();
            e.preventDefault();
        } else if (e.key === 'Enter') {
            if (activeIndex >= 0 && filtered[activeIndex]) {
                selectHotel(filtered[activeIndex]);
            }
        } else if (e.key === 'Escape') {
            hideDropdown();
        }
    });
    dropdown.addEventListener('mousedown', e => {
        if (e.target.classList.contains('hotel-dropdown-item')) {
            const idx = +e.target.dataset.index;
            selectHotel(filtered[idx]);
        }
    });
    document.addEventListener('mousedown', e => {
        if (!container.contains(e.target)) hideDropdown();
    });
}