    const imageUrls = [
      "https://picsum.photos/200/300",
      "https://picsum.photos/seed/picsum/200/300",
      "https://picsum.photos/id/237/200/300",
      "https://picsum.photos/200/300?grayscale",
      "https://picsum.photos/200/300?blur=2",
      "https://picsum.photos/200/300?random=1",
      "https://picsum.photos/200/300?width=200&height=300",
      "https://picsum.photos/200/300?grayscale&blur=2",
      "https://picsum.photos/200/300?random=1&grayscale",
      "https://picsum.photos/200/300?random=1&blur=2",
      "https://picsum.photos/200/300?random=1&width=200&height=300",
      "https://picsum.photos/200/300?grayscale&blur=2&random=1",
      "https://picsum.photos/200/300?grayscale&blur=2&width=200&height=300",
      "https://picsum.photos/200/300?random=1&grayscale&blur=2",
      "https://picsum.photos/200/300?random=1&grayscale&blur=2&width=200&height=300"
    ];

let index = 0;

const sliderImage = document.getElementById('sliderImage');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

function showImage(i) {
    sliderImage.src = images[i];
}

nextBtn.addEventListener('click', () => {
    index = (index + 1) % images.length;
    showImage(index);
});

prevBtn.addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    showImage(index);
});
