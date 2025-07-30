function createCard(title, cName, views, monthsOld, duration, thumbnail) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="thumbnail">
      <img src="https://i.ytimg.com/vi/kJEsTjH5mVg/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLBYghRBiZcZs-xVJKq92lAM8h3BOg">
      <div class="duration">${duration}</div>
      <div class="label">Tutorial</div>
    </div>
    <div class="video-info">
      <h3 class="title">${title}</h3>
      <p class="channel">${cName} • ${formatViews(views)} views • ${monthsOld} months ago</p>
    </div>
  `;

  document.getElementById("card-container").appendChild(card);
}

function formatViews(views) {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + "M";
  } else if (views >= 1000) {
    return (views / 1000).toFixed(0) + "K";
  }
  return views.toString();
}

// Example usage:
createCard(
  "Introduction to Backend | Sigma Web Dev video #2",
  "CodeWithHarry",
  560000,
  7,
  "31:22",
  "your-thumbnail.jpg" // replace with your actual image
);
