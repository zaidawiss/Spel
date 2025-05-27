const imagePools = {
    "sota-djur": [
      "https://cdn.pixabay.com/photo/2016/02/22/10/06/hedgehog-1215140_1280.jpg",
      "https://i.pinimg.com/236x/73/7e/ff/737eff848413fd3f3ea9dc2551fa74c7.jpg",
      "https://static.bonniernews.se/images/21/1b/211bb1e190994d3daa89d140299e05dd/838@40.jpg",
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images-bonnier.imgix.net/files/ill/production/Hvorfor-har-jeg-trang-til-at-skade-nuttede-ting.jpg?auto=format,compress&fit=crop&w=500&q=80",
      "https://blogspace.c.nu/storage/blog-media/1276/5676414339_79a2ca09d3_z.jpg",
      "https://static3.devote.se/gallery/big/20120627/78959c06b107e9182f4a3ece8caf5446.jpg"
    ],
    "rymden": [
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
      "https://images.unsplash.com/photo-1477723373438-42d0d7d7447c",
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
    ],
    "mat": [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c4d",
      "https://images.unsplash.com/photo-1605478580706-6d9f2ffb5b70",
      "https://images.unsplash.com/photo-1576866209830-842d755da114"
    ]
  };
  
  const pairCountSelect = document.getElementById("pairCount");
  const categorySelect = document.getElementById("category");
  const board = document.getElementById("gameBoard");
  
  // 🧠 Uppdatera antal par automatiskt
  function updatePairOptions() {
    const category = categorySelect.value;
    const availableImages = imagePools[category] || [];
    const maxPairs = availableImages.length;
  
    pairCountSelect.innerHTML = "";
  
    for (let i = 2; i <= maxPairs; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `${i} (${i * 2} kort)`;
      pairCountSelect.appendChild(option);
    }
  }
  
  // 👂 Lyssna på ändringar i kategori
  categorySelect.addEventListener("change", updatePairOptions);
  
  // Starta direkt med aktuell kategori
  updatePairOptions();
  
  document.getElementById("startGame").addEventListener("click", () => {
    const pairCount = parseInt(pairCountSelect.value, 10);
    const category = categorySelect.value;
    const availableImages = imagePools[category] || [];
  
    board.innerHTML = "";
  
    const selected = availableImages
      .sort(() => Math.random() - 0.5)
      .slice(0, pairCount);
  
    const imageUrls = [...selected, ...selected].sort(() => Math.random() - 0.5);
  
    let flippedCards = [];
  
    imageUrls.forEach((url) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.image = url;
  
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front"></div>
          <div class="card-back"><img src="${url}" alt="bild"></div>
        </div>
      `;
  
      card.addEventListener("click", () => {
        if (card.classList.contains("flipped") || flippedCards.length === 2) return;
  
        card.classList.add("flipped");
        flippedCards.push(card);
  
        if (flippedCards.length === 2) {
          const [first, second] = flippedCards;
  
          if (first.dataset.image === second.dataset.image) {
            setTimeout(() => {
              first.style.visibility = "hidden";
              second.style.visibility = "hidden";
              flippedCards = [];
            }, 600);
          } else {
            setTimeout(() => {
              first.classList.remove("flipped");
              second.classList.remove("flipped");
              flippedCards = [];
            }, 1000);
          }
        }
      });
  
      board.appendChild(card);
    });
  });
  