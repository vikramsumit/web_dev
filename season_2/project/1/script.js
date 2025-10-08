
    // --- Demo tracks (royalty-free sources) ---
    const TRACKS = [
      // {
      //   id: 'mySong',
      //   title: 'My Local Song',
      //   artist: 'Me',
      //   album: 'Custom',
      //   durationSec: 200,
      //   src: 'music/mahabharat.mp3',
      //   cover: 'cover.jpg'
      // },
      {
        id: 't1',
        title: 'SoundHelix Song 1',
        artist: 'T. Schürger',
        album: 'SoundHelix',
        durationSec: 348,
        src: 'https://www.jiosaavn.com/album/saiyaara/a,jB8phfIiI_',
        cover: 'https://c.saavncdn.com/598/Saiyaara-Hindi-2025-20250703061754-500x500.jpg'
      },
      {
        id: 't2',
        title: 'SoundHelix Song 2',
        artist: 'T. Schürger',
        album: 'SoundHelix',
        durationSec: 355,
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        cover: 'https://picsum.photos/seed/helix2/300/300'
      },
      {
        id: 't3',
        title: 'SoundHelix Song 3',
        artist: 'T. Schürger',
        album: 'SoundHelix',
        durationSec: 356,
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        cover: 'https://picsum.photos/seed/helix3/300/300'
      },
      {
        id: 't4',
        title: 'Creative Minds',
        artist: 'Ben Sound',
        album: 'Bensound',
        durationSec: 122,
        src: 'https://cdn.pixabay.com/download/audio/2019/06/07/audio_3bb5b1d5f4.mp3?filename=creative-minds-11238.mp3',
        cover: 'https://picsum.photos/seed/creative/300/300'
      },
      {
        id: 't5',
        title: 'Inspiring Cinematic Ambient',
        artist: 'AudioCoffee',
        album: 'Pixabay',
        durationSec: 150,
        src: 'https://cdn.pixabay.com/download/audio/2021/09/14/audio_b0a0d1b2fb.mp3?filename=inspiring-cinematic-ambient-116199.mp3',
        cover: 'https://picsum.photos/seed/ambient/300/300'
      }
    ];

    // --- State ---
    const audio = document.getElementById('audio');
    const state = {
      index: 0,
      playing: false,
      shuffle: JSON.parse(localStorage.getItem('shuffle') || 'false'),
      repeat: JSON.parse(localStorage.getItem('repeat') || 'false'),
      liked: new Set(JSON.parse(localStorage.getItem('liked') || '[]')),
      queue: [...TRACKS.map(t => t.id)],
    };

    // --- UI refs ---
    const nowCover = document.getElementById('nowCover');
    const nowTitle = document.getElementById('nowTitle');
    const nowArtist = document.getElementById('nowArtist');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const seek = document.getElementById('seek');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    const volume = document.getElementById('volume');
    const queueCount = document.getElementById('queueCount');
    const likedCount = document.getElementById('likedCount');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const cards = document.getElementById('cards');
    const tbody = document.getElementById('tracksTbody');
    const search = document.getElementById('search');
    const fileInput = document.getElementById("fileInput");
    const uploadBtn = document.getElementById("uploadBtn");

    uploadBtn.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", (e) => {
      for (const file of e.target.files) {
        const url = URL.createObjectURL(file); // blob URL for playback
        const track = {
          id: "local-" + file.name,
          title: file.name.replace(/\.[^/.]+$/, ""), // remove extension
          artist: "Local File",
          album: "Local",
          durationSec: 0, // will fill in later
          src: url,
          cover: "https://picsum.photos/seed/" + encodeURIComponent(file.name) + "/300/300"
        };
        TRACKS.push(track);
      }
      renderLists(); // refresh UI with new tracks
    });

    function formatTime(sec) {
      if (!Number.isFinite(sec)) return '0:00';
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    }

    function savePrefs() {
      localStorage.setItem('shuffle', JSON.stringify(state.shuffle));
      localStorage.setItem('repeat', JSON.stringify(state.repeat));
      localStorage.setItem('liked', JSON.stringify([...state.liked]));
    }

    function updateNow() {
      const t = TRACKS[state.index];
      if (!t) return;
      nowCover.src = t.cover;
      nowTitle.textContent = t.title;
      nowArtist.textContent = t.artist;
      audio.src = t.src;
      totalTimeEl.textContent = formatTime(t.durationSec);
      document.title = `${t.title} · Sonic`;
      highlightActiveRow();
    }

    function highlightActiveRow() {
      document.querySelectorAll('[data-row]')?.forEach(r => r.style.outline = 'none');
      const t = TRACKS[state.index];
      const row = document.querySelector(`[data-row="${t.id}"]`);
      if (row) row.style.outline = '1px solid #2a2a2a';
    }

    function renderLists(filter = '') {
      const q = filter.trim().toLowerCase();
      const filtered = TRACKS.filter(t => `${t.title} ${t.artist} ${t.album}`.toLowerCase().includes(q));
      // Cards
      cards.innerHTML = '';
      filtered.forEach((t) => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
          <img class="cover" src="${t.cover}" alt="${t.title}" />
          <div style="display:flex; align-items:center; gap:8px;">
            <div>
              <div class="title">${t.title}</div>
              <div class="meta">${t.artist} • ${t.album}</div>
            </div>
            <button class="like" data-like="${t.id}">${state.liked.has(t.id) ? '💚 Liked' : '🤍 Like'}</button>
          </div>
        `;
        div.addEventListener('click', (e) => {
          if (e.target.closest('[data-like]')) return; // handled separately
          const idx = TRACKS.findIndex(x => x.id === t.id);
          if (idx > -1) { state.index = idx; updateNow(); play(); }
        });
        cards.appendChild(div);
      });

      // Table
      tbody.innerHTML = '';
      filtered.forEach((t, i) => {
        const tr = document.createElement('tr');
        tr.setAttribute('data-row', t.id);
        tr.innerHTML = `
          <td>${i + 1}</td>
          <td>
            <div style="display:flex; align-items:center; gap:10px;">
              <img src="${t.cover}" alt="${t.title}" style="width:36px; height:36px; border-radius:6px; object-fit:cover;"/>
              <div>
                <div style="font-weight:700;">${t.title}</div>
                <div class="meta">${t.artist}</div>
              </div>
            </div>
          </td>
          <td>${t.album}</td>
          <td>${formatTime(t.durationSec)}</td>
          <td style="text-align:right;">
            <button class="btn ghost" data-play="${t.id}">▶</button>
            <button class="btn ghost" data-like="${t.id}">${state.liked.has(t.id) ? '💚' : '🤍'}</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
      queueCount.textContent = filtered.length;
      likedCount.textContent = state.liked.size;
    }

    function toggleLike(id) {
      if (state.liked.has(id)) state.liked.delete(id); else state.liked.add(id);
      savePrefs();
      renderLists(search.value);
    }

    function play() {
      audio.play().then(() => { state.playing = true; playBtn.textContent = '⏸'; }).catch(() => { });
    }
    function pause() { audio.pause(); state.playing = false; playBtn.textContent = '▶'; }

    function next() {
      if (state.shuffle) {
        state.index = Math.floor(Math.random() * TRACKS.length);
      } else {
        state.index = (state.index + 1) % TRACKS.length;
      }
      updateNow();
      play();
    }
    function prev() {
      state.index = (state.index - 1 + TRACKS.length) % TRACKS.length;
      updateNow();
      play();
    }

    // --- Events ---
    playBtn.addEventListener('click', () => state.playing ? pause() : play());
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    volume.addEventListener('input', () => audio.volume = volume.value);
    seek.addEventListener('input', () => { audio.currentTime = (seek.value / 100) * (audio.duration || 0); });

    shuffleBtn.addEventListener('click', () => { state.shuffle = !state.shuffle; shuffleBtn.style.borderColor = state.shuffle ? '#1db954' : 'var(--border)'; savePrefs(); });
    repeatBtn.addEventListener('click', () => { state.repeat = !state.repeat; repeatBtn.style.borderColor = state.repeat ? '#1db954' : 'var(--border)'; savePrefs(); });

    search.addEventListener('input', () => renderLists(search.value));

    document.addEventListener('click', (e) => {
      const like = e.target.closest('[data-like]');
      if (like) { toggleLike(like.getAttribute('data-like')); return; }
      const playRow = e.target.closest('[data-play]');
      if (playRow) {
        const id = playRow.getAttribute('data-play');
        const idx = TRACKS.findIndex(t => t.id === id);
        if (idx > -1) { state.index = idx; updateNow(); play(); }
      }
    });

    audio.addEventListener('timeupdate', () => {
      const d = audio.duration || 0; const c = audio.currentTime || 0;
      seek.value = d ? (c / d) * 100 : 0;
      currentTimeEl.textContent = formatTime(c);
      totalTimeEl.textContent = formatTime(d || TRACKS[state.index]?.durationSec || 0);
    });
    audio.addEventListener('ended', () => { if (state.repeat) { audio.currentTime = 0; play(); } else { next(); } });

    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (e.code === 'Space') { e.preventDefault(); state.playing ? pause() : play(); }
      if (e.code === 'ArrowRight') { audio.currentTime = Math.min((audio.currentTime || 0) + 5, audio.duration || 0); }
      if (e.code === 'ArrowLeft') { audio.currentTime = Math.max((audio.currentTime || 0) - 5, 0); }
      if (e.code === 'ArrowUp') { e.preventDefault(); volume.value = Math.min(parseFloat(volume.value) + 0.05, 1).toFixed(2); audio.volume = volume.value; }
      if (e.code === 'ArrowDown') { e.preventDefault(); volume.value = Math.max(parseFloat(volume.value) - 0.05, 0).toFixed(2); audio.volume = volume.value; }
    });

    document.getElementById('newPlaylistBtn').addEventListener('click', () => {
      alert('Playlists are demo-only in this single-file build. Duplicate this file and customize TRACKS to create themed playlists.');
    });

    document.getElementById('likedBtn').addEventListener('click', () => {
      if (!state.liked.size) return alert('No liked songs yet. Click 🤍 to like.');
      const ids = [...state.liked];
      const names = ids.map(id => TRACKS.find(t => t.id === id)?.title).filter(Boolean).join('\n• ');
      alert('Liked songs:\n• ' + names);
    });

    // Initial render
    shuffleBtn.style.borderColor = state.shuffle ? '#1db954' : 'var(--border)';
    repeatBtn.style.borderColor = state.repeat ? '#1db954' : 'var(--border)';
    renderLists();
    updateNow();
    audio.volume = volume.value;