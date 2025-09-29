// Estado global del reproductor
let playerState = {
    isPlaying: false,
    currentSong: 'Stricken',
    currentArtist: 'Por Disturbed',
    progress: 0,
    volume: 100,
    duration: 0,
    currentTime: 0,
    startTime: null
};

function timeToSeconds(timeString) {
    const parts = timeString.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

function secondsToTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function applyPlayerState() {

    const players = document.querySelectorAll('.player');
    if (players.length > 0) {
        players.forEach(player => {
            const playPauseBtn = player.querySelector('.play-pause-btn');
            const playerDetails = player.querySelector('.player-details');
            const progressFill = player.querySelector('.progress-fill');
            const volumeFill = player.querySelector('.volume-fill');
            const currentTimeDisplay = player.querySelector('.current-time');
            const totalTimeDisplay = player.querySelector('.total-time');
            
            if (playPauseBtn) {
                const icon = playPauseBtn.querySelector('i');
                if (playerState.isPlaying) {
                    icon.classList.remove('fa-play');
                    icon.classList.add('fa-pause');
                    playPauseBtn.style.background = '#2a9d8a';
                } else {
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                    playPauseBtn.style.background = '#2a9d8a';
                }
            }
            
            if (playerDetails) {
                const title = playerDetails.querySelector('h4');
                const subtitle = playerDetails.querySelector('p');
                if (title) title.textContent = playerState.currentSong;
                if (subtitle) subtitle.textContent = playerState.currentArtist;
            }
            
            if (progressFill) {
                progressFill.style.width = `${playerState.progress}%`;
            }
            
            if (volumeFill) {
                volumeFill.style.width = `${playerState.volume}%`;
            }
            
            if (currentTimeDisplay) {
                currentTimeDisplay.textContent = secondsToTime(playerState.currentTime);
            }
            
            if (totalTimeDisplay) {
                totalTimeDisplay.textContent = secondsToTime(playerState.duration);
            }
        });
    }
}

// Verificar que ambos reproductores estén sincronizados
function syncPlayers() {
    const players = document.querySelectorAll('.player');
    if (players.length > 1) {
        console.log('Se detectaron múltiples reproductores, sincronizando...');
        players.forEach(player => {
            const playPauseBtn = player.querySelector('.play-pause-btn');
            const playerDetails = player.querySelector('.player-details');
            const progressFill = player.querySelector('.progress-fill');
            const volumeFill = player.querySelector('.volume-fill');
            const currentTimeDisplay = player.querySelector('.current-time');
            const totalTimeDisplay = player.querySelector('.total-time');
            
            if (playPauseBtn) {
                const icon = playPauseBtn.querySelector('i');
                if (playerState.isPlaying) {
                    icon.classList.remove('fa-play');
                    icon.classList.add('fa-pause');
                    playPauseBtn.style.background = '#2a9d8a';
                } else {
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                    playPauseBtn.style.background = '#2a9d8a';
                }
            }
            
            if (playerDetails) {
                const title = playerDetails.querySelector('h4');
                const subtitle = playerDetails.querySelector('p');
                if (title) title.textContent = playerState.currentSong;
                if (subtitle) subtitle.textContent = playerState.currentArtist;
            }
            
            if (progressFill) {
                progressFill.style.width = `${playerState.progress}%`;
            }
            
            if (volumeFill) {
                volumeFill.style.width = `${playerState.volume}%`;
            }
            
            if (currentTimeDisplay) {
                currentTimeDisplay.textContent = secondsToTime(playerState.currentTime);
            }
            
            if (totalTimeDisplay) {
                totalTimeDisplay.textContent = secondsToTime(playerState.duration);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    applyPlayerState();
 
    syncPlayers();
    
    // Inicializar funcionalidad de clics en el reproductor fijo
    initPlayerClickHandlers();

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
        logo.style.cursor = 'pointer';
    }

    // Botón de home
    const homeBtn = document.getElementById('homeBtn');
    if (homeBtn) {
        homeBtn.addEventListener('click', function() {
            this.style.background = '#2a9d8a';
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.background = 'rgba(255, 255, 255, 0.1)';
                this.style.transform = 'scale(1)';
                window.location.href = 'index.html';
            }, 200);
        });
    }
    // Efectos hover en las cards
    const cards = document.querySelectorAll('.content-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Botones de play
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Obtener información de la card
            const card = this.closest('.content-card');
            const title = card.querySelector('.card-title');
            const subtitle = card.querySelector('.card-subtitle');
            
            if (title && subtitle) {
                // Mostrar alert con información de la canción/playlist
                alert(`Reproduciendo: ${title.textContent} - ${subtitle.textContent}`);
            } else {
                // Fallback si no se encuentra la información
                alert('Reproduciendo contenido');
            }
        });
    });

    // Botones de favoritos
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-heart')) {
                this.style.color = '#ff6b6b';
                setTimeout(() => {
                    this.style.color = '#ffffff';
                }, 200);
                alert('Agregado a favoritos');
            }
        });
    });

    // Menús contextuales - DESHABILITADOS para index.html
    const contextMenuButtons = document.querySelectorAll('.context-menu-btn');
    contextMenuButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Verificar si estamos en index.html - deshabilitar funcionalidad
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
                console.log('Menú contextual clickeado pero funcionalidad deshabilitada en index.html');
                return;
            }
            
            // Verificar si es el menú contextual de favorites.html, playlist-details.html o my-playlist.html
            if (window.location.pathname.includes('favorites.html') || window.location.pathname.includes('playlist-details.html') || window.location.pathname.includes('my-playlist.html')) {
                const songId = this.getAttribute('data-song-id');
                if (songId) {
                    // Usar nuestro menú contextual global si existe
                    currentSongId = songId;
                    const contextMenu = document.getElementById('contextMenu');
                    if (contextMenu) {
                        // Cerrar otros menús
                        document.querySelectorAll('.context-menu').forEach(otherMenu => {
                            if (otherMenu !== contextMenu) {
                                otherMenu.style.opacity = '0';
                                otherMenu.style.visibility = 'hidden';
                                otherMenu.style.transform = 'translateY(10px)';
                                otherMenu.classList.remove('show');
                            }
                        });
                        
                        // Posicionar y mostrar nuestro menú
                        const rect = this.getBoundingClientRect();
                        contextMenu.style.left = (rect.left - 180) + 'px';
                        contextMenu.style.top = (rect.bottom + 5) + 'px';
                        contextMenu.classList.add('show');
                        return;
                    }
                }
            }
            
            // Lógica para menús contextuales locales (funciona en todas las páginas)
            const menu = this.nextElementSibling;
            if (menu && menu.classList.contains('context-menu')) {
                // Cerrar otros menús
                document.querySelectorAll('.context-menu').forEach(otherMenu => {
                    if (otherMenu !== menu) {
                        otherMenu.style.opacity = '0';
                        otherMenu.style.visibility = 'hidden';
                        otherMenu.style.transform = 'translateY(10px)';
                        otherMenu.classList.remove('show');
                    }
                });
                
                // Toggle del menú actual
                const isVisible = menu.style.opacity === '1';
                if (isVisible) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(10px)';
                } else {
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                    menu.style.transform = 'translateY(0)';
                }
            }
        });
    });

    function initializeCarouselButtons() {
        document.querySelectorAll('.carousel-container').forEach(container => {
            const track = container.querySelector('.carousel-track');
            if (track) {
                const carouselName = track.id.replace('-carousel', '');
                const cards = track.querySelectorAll('.content-card');
                const cardsPerView = carouselName === 'related' ? 3 : 5;
                
                if (cards.length <= cardsPerView) {

                    const prevBtn = container.querySelector('.prev');
                    const nextBtn = container.querySelector('.next');
                    if (prevBtn) {
                        prevBtn.style.opacity = '0';
                        prevBtn.style.visibility = 'hidden';
                        prevBtn.style.pointerEvents = 'none';
                    }
                    if (nextBtn) {
                        nextBtn.style.opacity = '0';
                        nextBtn.style.visibility = 'hidden';
                        nextBtn.style.pointerEvents = 'none';
                    }
                } else {

                    const prevBtn = container.querySelector('.prev');
                    const nextBtn = container.querySelector('.next');
                    if (prevBtn) {
                        prevBtn.style.opacity = '0';
                        prevBtn.style.visibility = 'hidden';
                        prevBtn.style.pointerEvents = 'none';
                    }
                    if (nextBtn) {
                        nextBtn.style.opacity = '1';
                        nextBtn.style.visibility = 'visible';
                        nextBtn.style.pointerEvents = 'auto';
                    }
                }
            }
        });
    }

    initializeCarouselButtons();


    const carouselButtons = document.querySelectorAll('.carousel-btn');
    carouselButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const carouselName = this.getAttribute('data-carousel');
            const direction = this.classList.contains('prev') ? 'prev' : 'next';
            

            const track = document.getElementById(carouselName + '-carousel');
            if (track) {
                const cards = track.querySelectorAll('.content-card');
                if (cards.length === 0) return;
                
                const cardWidth = cards[0].offsetWidth + 20; 
                const currentTransform = track.style.transform || 'translateX(0px)';
                const currentX = parseInt(currentTransform.match(/-?\d+/)[0]) || 0;
                

                const cardsPerView = 5; // 5 cards visibles en desktop
                const totalCards = cards.length;
                

                if (totalCards <= cardsPerView) {
                    return;
                }
                

                const minX = 0; // Posición inicial
                const maxX = -(totalCards - cardsPerView) * cardWidth; // Última posición válida
                

                if (direction === 'next') {

                    if (currentX <= maxX) {
                        return; // No hacer nada si ya estamos en el límite
                    }

                    let newX = currentX - cardWidth;
                    if (newX < maxX) {
                        newX = maxX;
                    }
                    track.style.transform = `translateX(${newX}px)`;
                    

                    const prevBtn = this.parentElement.querySelector('.prev');
                    const nextBtn = this.parentElement.querySelector('.next');
                    

                    if (prevBtn) {
                        prevBtn.style.opacity = '1';
                        prevBtn.style.visibility = 'visible';
                        prevBtn.style.pointerEvents = 'auto';
                    }
                    

                    if (nextBtn) {
                        if (newX <= maxX) {
                            nextBtn.style.opacity = '0';
                            nextBtn.style.visibility = 'hidden';
                            nextBtn.style.pointerEvents = 'none';
                        } else {
                            nextBtn.style.opacity = '1';
                            nextBtn.style.visibility = 'visible';
                            nextBtn.style.pointerEvents = 'auto';
                        }
                    }
                } else {

                    if (currentX >= minX) {
                        return; // No hacer nada si ya estamos en el límite
                    }

                    let newX = currentX + cardWidth;
                    if (newX > minX) {
                        newX = minX;
                    }
                    track.style.transform = `translateX(${newX}px)`;
                    

                    const prevBtn = this.parentElement.querySelector('.prev');
                    const nextBtn = this.parentElement.querySelector('.next');
                    

                    if (prevBtn) {
                        if (newX >= 0) {
                            prevBtn.style.opacity = '0';
                            prevBtn.style.visibility = 'hidden';
                            prevBtn.style.pointerEvents = 'none';
                        } else {
                            prevBtn.style.opacity = '1';
                            prevBtn.style.visibility = 'visible';
                            prevBtn.style.pointerEvents = 'auto';
                        }
                    }
                    

                    if (nextBtn) {
                        nextBtn.style.opacity = '1';
                        nextBtn.style.visibility = 'visible';
                        nextBtn.style.pointerEvents = 'auto';
                    }
                }
            }
        });
    });


    document.querySelectorAll('.content-card').forEach(card => {
        const title = card.querySelector('.card-title');
        if (title && title.textContent === 'Hora de Gym') {
            card.addEventListener('click', function(e) {
                if (e.target.closest('.card-actions') || 
                    e.target.closest('.play-btn') || 
                    e.target.closest('.action-btn') || 
                    e.target.closest('.context-menu-container')) {
                    return;
                }
                
                window.location.href = 'playlist-details.html';
            });
        }
    });


    document.addEventListener('click', function(e) {
        if (!e.target.closest('.context-menu-container') && !e.target.closest('.context-menu-btn') && !e.target.closest('.context-menu')) {
            document.querySelectorAll('.context-menu').forEach(menu => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(10px)';
                menu.classList.remove('show');
            });
        }
    });


    document.querySelectorAll('.context-menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const card = this.closest('.content-card');
            const cardTitle = card ? card.querySelector('.card-title').textContent : 'elemento';
            const isShare = this.classList.contains('share-item');
            const isSave = this.classList.contains('save-item');
            const isEdit = this.classList.contains('edit-item');
            const isDelete = this.classList.contains('delete-item');
            

            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            setTimeout(() => {
                if (isShare) {
                    alert(`Compartiendo: "${cardTitle}"`);
                } else if (isSave) {
                    alert(`"${cardTitle}" guardado en tu biblioteca`);
                } else if (isEdit) {
                    alert(`Editando: "${cardTitle}"`);
                } else if (isDelete) {
                    if (confirm(`¿Estás seguro de que quieres eliminar "${cardTitle}"?`)) {
                        if (card) {
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                card.remove();
                            }, 300);
                        }
                    }
                }
                

                const menu = this.closest('.context-menu');
                if (menu) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(10px)';
                }
            }, 200);
        });
    });

    // Búsqueda
    const searchBar = document.querySelector('.search-bar');
    if (searchBar) {
        searchBar.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        searchBar.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });

        searchBar.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    // Redirigir a la página de resultados de búsqueda
                    window.location.href = `search-results.html?q=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    }

    // Notificaciones
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationsPanel = document.getElementById('notificationsPanel');
    const closeNotificationsBtn = document.getElementById('closeNotificationsBtn');
    const notificationsOverlay = document.getElementById('notificationsOverlay');

    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            this.style.background = '#2a9d8a';
            setTimeout(() => {
                this.style.background = 'rgba(255, 255, 255, 0.1)';
            }, 200);
            
            // Mostrar panel de notificaciones
            if (notificationsPanel) {
                notificationsPanel.classList.add('show');
                notificationsOverlay.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Cerrar panel de notificaciones
    function closeNotifications() {
        if (notificationsPanel) {
            notificationsPanel.classList.remove('show');
            notificationsOverlay.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }

    if (closeNotificationsBtn) {
        closeNotificationsBtn.addEventListener('click', closeNotifications);
    }

    if (notificationsOverlay) {
        notificationsOverlay.addEventListener('click', closeNotifications);
    }

    // Cerrar notificaciones con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && notificationsPanel && notificationsPanel.classList.contains('show')) {
            closeNotifications();
        }
    });

    // Funcionalidad de los elementos de notificaciones
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.notification-title').textContent;
            
            // Efecto visual
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Simular acción
            setTimeout(() => {
                alert(`Abriendo notificación: ${title}`);
            }, 200);
        });
    });

    // Botón "Ver todas las notificaciones"
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            setTimeout(() => {
                alert('Redirigiendo a todas las notificaciones...');
                closeNotifications();
            }, 200);
        });
    }

    // Biblioteca
    document.querySelectorAll('.library-menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const section = this.getAttribute('data-section');
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            setTimeout(() => {
                if (section === 'favorites') {
                    const favoritesSection = document.querySelector('.section:nth-child(2)');
                    if (favoritesSection) {
                        favoritesSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                } else if (section === 'playlists') {
                    const playlistsSection = document.querySelector('.section:nth-child(4)');
                    if (playlistsSection) {
                        playlistsSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            }, 300);
        });
    });

    // Usuario
    const userBtn = document.querySelector('.user-btn');
    const userSettingsPanel = document.getElementById('userSettingsPanel');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const settingsOverlay = document.getElementById('settingsOverlay');

    if (userBtn) {
        userBtn.addEventListener('click', function() {
            this.style.background = '#2a9d8a';
            this.style.color = '#ffffff';
            this.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 150);
            
            setTimeout(() => {
                this.style.background = 'rgba(255, 255, 255, 0.1)';
                this.style.color = '#ffffff';
                this.style.transform = 'scale(1)';
            }, 300);
            
            // Mostrar panel de ajustes
            if (userSettingsPanel) {
                userSettingsPanel.classList.add('show');
                settingsOverlay.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Cerrar panel de ajustes
    function closeSettings() {
        if (userSettingsPanel) {
            userSettingsPanel.classList.remove('show');
            settingsOverlay.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }

    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', closeSettings);
    }

    if (settingsOverlay) {
        settingsOverlay.addEventListener('click', closeSettings);
    }

    // Cerrar ajustes con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && userSettingsPanel && userSettingsPanel.classList.contains('show')) {
            closeSettings();
        }
    });

    // Funcionalidad de los elementos de ajustes
    const settingsItems = document.querySelectorAll('.settings-item');
    settingsItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            
            // Efecto visual
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Redirigir a planes si es el elemento "Plan"
            if (text === 'Plan') {
                setTimeout(() => {
                    window.location.href = 'plans.html';
                }, 200);
                return;
            }
            
            // Redirigir a ayuda si es el elemento "Ayuda"
            if (text === 'Ayuda') {
                setTimeout(() => {
                    window.location.href = 'help.html';
                }, 200);
                return;
            }
            
            // Simular acción para otros elementos
            setTimeout(() => {
                alert(`Abriendo: ${text}`);
            }, 200);
        });
    });

    // Botón de cerrar sesión
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            setTimeout(() => {
                if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                    alert('Cerrando sesión...');
                    closeSettings();
                }
            }, 200);
        });
    }

    // Funcionalidad de los toggle switches
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const label = this.nextElementSibling;
            const settingName = this.closest('.settings-item').querySelector('span').textContent;
            
            // Efecto visual
            label.style.transform = 'scale(0.9)';
            setTimeout(() => {
                label.style.transform = 'scale(1)';
            }, 150);
            
            // Simular cambio de configuración
            setTimeout(() => {
                const status = this.checked ? 'activado' : 'desactivado';
                alert(`${settingName}: ${status}`);
            }, 200);
        });
    });

    // Funcionalidad del panel lateral
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    // Abrir panel lateral
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function() {
            sidebar.classList.add('open');
            sidebarOverlay.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevenir scroll del body
        });
    }

    // Cerrar panel lateral
    function closeSidebar() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restaurar scroll del body
    }

    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Cerrar con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
            closeSidebar();
        }
    });

    // Funcionalidad de los elementos del sidebar
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        // Click en el elemento (solo alert)
        item.addEventListener('click', function(e) {
            // Si el elemento tiene un onclick definido, no hacer nada (dejar que se ejecute)
            if (this.hasAttribute('onclick')) {
                return;
            }
            
            const title = this.querySelector('.sidebar-item-title').textContent;
            const subtitle = this.querySelector('.sidebar-item-subtitle').textContent;
            
            // Solo mostrar alert sin cambiar el reproductor
            alert(`Reproduciendo: ${title.replace('📌 ', '').trim()} - ${subtitle}`);
        });
    });

    // Funcionalidad del título para abrir detalles
    const sidebarTitles = document.querySelectorAll('.sidebar-item-title');
    sidebarTitles.forEach(title => {
        title.addEventListener('click', function(e) {
            const item = this.closest('.sidebar-item');
            
            // Si el elemento padre tiene un onclick definido, no hacer nada (dejar que se ejecute)
            if (item && item.hasAttribute('onclick')) {
                return;
            }
            
            e.stopPropagation(); // Prevenir que se ejecute el click del elemento padre
            
            const subtitle = item.querySelector('.sidebar-item-subtitle').textContent;
            
            // Efecto visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Navegación especial para "Canciones que te gustan"
            if (this.textContent.includes('Canciones que te gustan')) {
                setTimeout(() => {
                    window.location.href = 'favorites.html';
                }, 200);
            } else {
                // Simular navegación a detalles para otros elementos
                setTimeout(() => {
                    alert(`Abriendo detalles de: ${this.textContent} - ${subtitle}`);
                }, 200);
            }
        });
    });

    // Funcionalidad del subtítulo para reproducir
    const sidebarSubtitles = document.querySelectorAll('.sidebar-item-subtitle');
    sidebarSubtitles.forEach(subtitle => {
        subtitle.addEventListener('click', function(e) {
            const item = this.closest('.sidebar-item');
            
            // Si el elemento padre tiene un onclick definido, no hacer nada (dejar que se ejecute)
            if (item && item.hasAttribute('onclick')) {
                return;
            }
            
            e.stopPropagation(); // Prevenir que se ejecute el click del elemento padre
            
            const title = item.querySelector('.sidebar-item-title').textContent;
            
            // Efecto visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Simular reproducción
            setTimeout(() => {
                alert(`Reproduciendo: ${title} - ${this.textContent}`);
            }, 200);
        });
    });

    // Funcionalidad de los botones de play del sidebar
    const sidebarPlayBtns = document.querySelectorAll('.sidebar-play-btn');
    sidebarPlayBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevenir que se ejecute el click del elemento padre
            
            const item = this.closest('.sidebar-item');
            const title = item.querySelector('.sidebar-item-title').textContent;
            const subtitle = item.querySelector('.sidebar-item-subtitle').textContent;
            
            // Solo mostrar alert sin cambiar nada más
            alert(`Reproduciendo: ${title.replace('📌 ', '').trim()} - ${subtitle}`);
        });
    });

    // Funcionalidad de filtros de recomendaciones
    const recommendationsFilters = document.querySelectorAll('.recommendations-filters .filter-btn');
    recommendationsFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            recommendationsFilters.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Efecto visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Simular filtrado
            setTimeout(() => {
                const filterText = this.querySelector('span').textContent;
                alert(`Filtrando por: ${filterText}`);
            }, 200);
        });
    });

    // Barra de progreso
    const progressBar = document.querySelector('.progress-bar');
    const progressFill = document.querySelector('.progress-fill');
    
    // Variable para rastrear reproducciones
    let playCount = 0;
    let hasShownRatingAlert = false;
    
    // Función para verificar y mostrar alert de calificación
    function checkRatingAlert() {
        console.log('Verificando alert:', playerState.progress, hasShownRatingAlert);
        if (playerState.progress >= 80 && !hasShownRatingAlert) {
            playCount++;
            hasShownRatingAlert = true;
            console.log('Mostrando alert de calificación');
            
            // Obtener el nombre real de la canción desde el reproductor
            const playerDetails = document.querySelector('.player-details h4');
            const currentSong = playerDetails ? playerDetails.textContent : 'esta canción';
            const alertMessage = `Has escuchado "${currentSong}" 3 veces, ¿quieres dejar tu opinión?`;
            
            if (confirm(alertMessage)) {
                // Redirigir a playlist-details.html con scroll a la sección de calificación
                window.location.href = 'playlist-details.html#rating-section';
            } else {
                alert('No hay problema, puedes calificar más tarde si quieres. 😊');
            }
            
            // NO resetear hasShownRatingAlert - que solo aparezca una vez por sesión
        } else {
            console.log('No se muestra alert - progreso:', playerState.progress, 'hasShown:', hasShownRatingAlert);
        }
    }
    
    // Función para resetear el estado (para testing)
    window.resetRatingState = function() {
        hasShownRatingAlert = false;
        playCount = 0;
        console.log('Estado de calificación reseteado');
    };
    
    if (progressBar && progressFill) {
        let isDragging = false;
        
        // Función para actualizar la barra de progreso
        function updateProgress(e) {
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
            progressFill.style.width = percentage + '%';
            
            console.log('Actualizando progreso:', percentage);
            
            // Actualizar estado del reproductor
            console.log('playerState.duration:', playerState.duration);
            playerState.progress = percentage;
            
            if (playerState.duration > 0) {
                playerState.currentTime = (playerState.progress / 100) * playerState.duration;
                
                const currentTimeDisplay = document.querySelector('.current-time');
                if (currentTimeDisplay) {
                    currentTimeDisplay.textContent = secondsToTime(playerState.currentTime);
                }
            }
            
            // Verificar si se llegó al 70% y mostrar alert de calificación (independiente de la duración)
            console.log('Verificando alert con progreso:', playerState.progress);
            checkRatingAlert();
        }
        
        // Evento de clic
        progressBar.addEventListener('click', function(e) {
            updateProgress(e);
        });
        
        // Eventos de arrastre
        progressBar.addEventListener('mousedown', function(e) {
            isDragging = true;
            updateProgress(e);
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                updateProgress(e);
            }
        });
        
        document.addEventListener('mouseup', function(e) {
            if (isDragging) {
                isDragging = false;
                updateProgress(e);
            }
        });
    }

    // Control de volumen
    const volumeSlider = document.querySelector('.volume-slider');
    const volumeFill = document.querySelector('.volume-fill');
    
    if (volumeSlider && volumeFill) {
        volumeSlider.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = (clickX / rect.width) * 100;
            volumeFill.style.width = percentage + '%';
            
            // Actualizar estado del reproductor
            playerState.volume = Math.max(0, Math.min(100, percentage));
        });
    }

    // Reproductor
    const playPauseBtn = document.querySelector('.play-pause-btn');
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-play')) {
                playerState.isPlaying = true;
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                this.style.background = '#1db954';
                
                // Simular progreso de reproducción
                if (playerState.duration > 0) {
                    simulatePlayback();
                }
            } else {
                playerState.isPlaying = false;
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                this.style.background = '#2a9d8a';
            }
            applyPlayerState();
        });
    }
    
    // Función para simular reproducción y detectar cuando termina
    function simulatePlayback() {
        if (!playerState.isPlaying) return;
        
        const progressFill = document.querySelector('.progress-fill');
        const currentTimeDisplay = document.querySelector('.current-time');
        
        if (playerState.currentTime < playerState.duration) {
            playerState.currentTime += 1;
            playerState.progress = (playerState.currentTime / playerState.duration) * 100;
            
            if (progressFill) {
                progressFill.style.width = playerState.progress + '%';
            }
            
            if (currentTimeDisplay) {
                currentTimeDisplay.textContent = secondsToTime(playerState.currentTime);
            }
            
            // Verificar si llegó al 80% durante la reproducción
            if (playerState.progress >= 80 && !hasShownRatingAlert) {
                playCount++;
                hasShownRatingAlert = true;
                
                const currentSong = playerState.currentSong || 'esta canción';
                const alertMessage = `Has escuchado "${currentSong}" 3 veces, ¿quieres dejar tu opinión?`;
                
                if (confirm(alertMessage)) {
                    // Redirigir a playlist-details.html con scroll a la sección de calificación
                    window.location.href = 'playlist-details.html#rating-section';
                } else {
                    alert('No hay problema, puedes calificar más tarde si quieres. 😊');
                }
                
                // NO resetear hasShownRatingAlert - que solo aparezca una vez por sesión
                
                // Pausar la reproducción
                playerState.isPlaying = false;
                const playPauseBtn = document.querySelector('.play-pause-btn');
                if (playPauseBtn) {
                    const icon = playPauseBtn.querySelector('i');
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                    playPauseBtn.style.background = '#2a9d8a';
                }
                return;
            }
            
            // Continuar la reproducción
            setTimeout(simulatePlayback, 1000);
        }
    }
    

    // Controles del reproductor
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-step-backward')) {
                // Ir al inicio de la canción
                playerState.currentTime = 0;
                playerState.progress = 0;
                const progressFill = document.querySelector('.progress-fill');
                if (progressFill) {
                    progressFill.style.width = '0%';
                }
                const currentTimeDisplay = document.querySelector('.current-time');
                if (currentTimeDisplay) {
                    currentTimeDisplay.textContent = '0:00';
                }
                alert('Inicio de la canción');
            } else if (icon.classList.contains('fa-step-forward')) {
                // Ir al final de la canción
                playerState.currentTime = playerState.duration;
                playerState.progress = 100;
                playerState.isPlaying = false;
                const progressFill = document.querySelector('.progress-fill');
                if (progressFill) {
                    progressFill.style.width = '100%';
                }
                const currentTimeDisplay = document.querySelector('.current-time');
                if (currentTimeDisplay) {
                    currentTimeDisplay.textContent = secondsToTime(playerState.duration);
                }
                const playPauseBtn = document.querySelector('.play-pause-btn');
                if (playPauseBtn) {
                    const playIcon = playPauseBtn.querySelector('i');
                    playIcon.classList.remove('fa-pause');
                    playIcon.classList.add('fa-play');
                    playPauseBtn.style.background = '#2a9d8a';
                }
                alert('Fin de la canción');
            } else if (icon.classList.contains('fa-random')) {
                alert('Modo aleatorio');
            } else if (icon.classList.contains('fa-redo')) {
                alert('Repetir');
            }
        });
    });

    // Botón de like del reproductor
    const playerLikeBtn = document.querySelector('.player-like-btn');
    if (playerLikeBtn) {
        playerLikeBtn.addEventListener('click', function() {
            this.style.color = '#ff6b6b';
            setTimeout(() => {
                this.style.color = '#ffffff';
            }, 200);
            alert('Agregado a favoritos');
        });
    }

    // Botones de acciones del reproductor
    const addToPlaylistBtn = document.querySelector('.add-to-playlist-btn');
    if (addToPlaylistBtn) {
        addToPlaylistBtn.addEventListener('click', function() {
            this.style.color = '#2a9d8a';
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.color = 'rgba(255, 255, 255, 0.7)';
                this.style.transform = 'scale(1)';
            }, 200);
            alert('Agregar a playlist - Funcionalidad próximamente disponible');
        });
    }


    const contextMenuBtn = document.querySelector('.context-menu-btn');
    if (contextMenuBtn) {
        contextMenuBtn.addEventListener('click', function() {
            this.style.color = '#2a9d8a';
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.color = 'rgba(255, 255, 255, 0.7)';
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // Funcionalidad para hacer clickeables el nombre de la canción y autor en el reproductor fijo
    function initPlayerClickHandlers() {
        // Buscar el reproductor fijo
        const player = document.querySelector('.player');
        if (player) {
            const playerDetails = player.querySelector('.player-details');
            if (playerDetails) {
                const songTitle = playerDetails.querySelector('h4');
                const songArtist = playerDetails.querySelector('p');
                
                // Hacer clickeable el título de la canción
                if (songTitle) {
                    songTitle.style.cursor = 'pointer';
                    songTitle.style.transition = 'all 0.3s ease';
                    
                    songTitle.addEventListener('click', function(e) {
                        e.stopPropagation();
                        
                        // Efecto visual
                        this.style.color = '#2a9d8a';
                        setTimeout(() => {
                            this.style.color = '';
                        }, 200);
                        
                        // Mostrar alert con detalles de la canción
                        const songName = this.textContent;
                        alert(`Detalles de ${songName}`);
                    });
                    
                    // Efecto hover
                    songTitle.addEventListener('mouseenter', function() {
                        this.style.color = '#2a9d8a';
                    });
                    
                    songTitle.addEventListener('mouseleave', function() {
                        this.style.color = '';
                    });
                }
                
                // Hacer clickeable el nombre del artista
                if (songArtist) {
                    songArtist.style.cursor = 'pointer';
                    songArtist.style.transition = 'all 0.3s ease';
                    
                    songArtist.addEventListener('click', function(e) {
                        e.stopPropagation();
                        
                        // Efecto visual
                        this.style.color = '#2a9d8a';
                        setTimeout(() => {
                            this.style.color = '';
                        }, 200);
                        
                        // Mostrar alert con detalles del artista
                        const artistName = this.textContent.replace('Por ', '');
                        alert(`Detalles de ${artistName}`);
                    });
                    
                    // Efecto hover
                    songArtist.addEventListener('mouseenter', function() {
                        this.style.color = '#2a9d8a';
                    });
                    
                    songArtist.addEventListener('mouseleave', function() {
                        this.style.color = '';
                    });
                }
            }
        }
    }

    // Funcionalidad específica para página de detalles
    if (window.location.pathname.includes('playlist-details.html')) {
       
        const playBtnLarge = document.querySelector('.play-btn-large');
        if (playBtnLarge) {
            playBtnLarge.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1.05)';
                }, 150);
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 300);
                
               
                playerState.currentSong = 'Hora de Gym';
                playerState.currentArtist = 'Por AC/DC, Pink Floyd, Led Zeppelin y más...';
                playerState.isPlaying = true;
                playerState.currentTime = 0;
                playerState.progress = 0;
                playerState.startTime = null;
                                    playerState.duration = 105 * 60; 
                applyPlayerState();
                
                alert('Reproduciendo playlist "Hora de Gym"');
            });
        }


        document.querySelectorAll('.action-btn-large').forEach(btn => {
            btn.addEventListener('click', function() {
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1.1)';
                }, 150);
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 300);
                
                const icon = this.querySelector('i');
                if (icon.classList.contains('fa-heart')) {
                    this.style.color = '#ff6b6b';
                    setTimeout(() => {
                        this.style.color = '#ffffff';
                    }, 200);
                    alert('Agregado a favoritos');
                } else if (icon.classList.contains('fa-share')) {
                    alert('Compartir playlist');
                }
            });
        });


        const shuffleBtn = document.querySelector('.shuffle-btn');
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', function() {
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1.1)';
                }, 150);
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 300);
                alert('Reproducción aleatoria activada');
            });
        }




        document.querySelectorAll('.song-action-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const icon = this.querySelector('i');
                if (icon.classList.contains('fa-heart')) {
                    this.style.color = '#ff6b6b';
                    setTimeout(() => {
                        this.style.color = '#ffffff';
                }, 200);
                    alert('Agregado a favoritos');
                } else if (icon.classList.contains('fa-ellipsis-h')) {
                    alert('Opciones de canción');
                }
            });
        });

        // Carrusel de playlists relacionadas
        document.querySelectorAll('.carousel-btn[data-carousel="related"]').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const direction = this.classList.contains('prev') ? 'prev' : 'next';
                
                const track = document.getElementById('related-carousel');
                if (track) {
                    const cards = track.querySelectorAll('.content-card');
                    if (cards.length === 0) return;
                    
                    const cardWidth = cards[0].offsetWidth + 20;
                    const currentTransform = track.style.transform || 'translateX(0px)';
                    const currentX = parseInt(currentTransform.match(/-?\d+/)[0]) || 0;
                    
                   
                    const cardsPerView = 3; 
                    const totalCards = cards.length;
                    
                   
                    if (totalCards <= cardsPerView) {
                        return;
                    }
                    
                   
                    const minX = 0; // Posición inicial
                    const maxX = -(totalCards - cardsPerView) * cardWidth; // Última posición válida
                    

                    if (direction === 'next') {
                       
                        if (currentX <= maxX) {
                            return; 
                        }
                        
                        let newX = currentX - cardWidth;
                        if (newX < maxX) {
                            newX = maxX;
                        }
                        track.style.transform = `translateX(${newX}px)`;
                        
                        
                        const prevBtn = this.parentElement.querySelector('.prev');
                        const nextBtn = this.parentElement.querySelector('.next');
                        
                        
                        if (prevBtn) {
                            prevBtn.style.opacity = '1';
                            prevBtn.style.visibility = 'visible';
                            prevBtn.style.pointerEvents = 'auto';
                        }
                        
                        
                        if (nextBtn) {
                            if (newX <= maxX) {
                                nextBtn.style.opacity = '0';
                                nextBtn.style.visibility = 'hidden';
                                nextBtn.style.pointerEvents = 'none';
                            } else {
                                nextBtn.style.opacity = '1';
                                nextBtn.style.visibility = 'visible';
                                nextBtn.style.pointerEvents = 'auto';
                            }
                        }
                    } else {
                        
                        if (currentX >= minX) {
                            return; // No hacer nada si ya estamos en el límite
                        }
                        
                        let newX = currentX + cardWidth;
                        if (newX > minX) {
                            newX = minX;
                        }
                        track.style.transform = `translateX(${newX}px)`;
                        
                        
                        const prevBtn = this.parentElement.querySelector('.prev');
                        const nextBtn = this.parentElement.querySelector('.next');
                        
                        
                        if (prevBtn) {
                            if (newX >= 0) {
                                prevBtn.style.opacity = '0';
                                prevBtn.style.visibility = 'hidden';
                                prevBtn.style.pointerEvents = 'none';
                            } else {
                                prevBtn.style.opacity = '1';
                                prevBtn.style.visibility = 'visible';
                                prevBtn.style.pointerEvents = 'auto';
                            }
                        }
                        
                        
                        if (nextBtn) {
                            nextBtn.style.opacity = '1';
                            nextBtn.style.visibility = 'visible';
                            nextBtn.style.pointerEvents = 'auto';
                        }
                    }
                }
            });
        });
    }
});

// Variables globales para el menú contextual
let currentSongId = null;
let contextMenu = null;

// Funciones globales del menú contextual
window.removeFromFavorites = function() {
    if (currentSongId) {
        const songItem = document.querySelector(`[data-song-id="${currentSongId}"]`).closest('.song-item');
        if (songItem) {
            songItem.style.transition = 'all 0.3s ease';
            songItem.style.opacity = '0';
            songItem.style.transform = 'translateX(-100%)';
            
            setTimeout(() => {
                songItem.remove();
                updateSongNumbers();
            }, 300);
        }
    }
    if (contextMenu) {
        contextMenu.classList.remove('show');
    }
};

window.shareSong = function() {
    if (currentSongId) {
        const songItem = document.querySelector(`[data-song-id="${currentSongId}"]`).closest('.song-item');
        const songTitle = songItem.querySelector('.song-title').textContent;
        const songArtist = songItem.querySelector('.song-artist').textContent;
        
        if (navigator.share) {
            navigator.share({
                title: `${songTitle} - ${songArtist}`,
                text: `Escucha "${songTitle}" de ${songArtist} en Spoiler Five`,
                url: window.location.href
            });
        } else {
            // Fallback para navegadores que no soportan Web Share API
            const shareText = `Escucha "${songTitle}" de ${songArtist} en Spoiler Five: ${window.location.href}`;
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Enlace copiado al portapapeles');
            }).catch(() => {
                alert(shareText);
            });
        }
    }
    if (contextMenu) {
        contextMenu.classList.remove('show');
    }
};

// Funciones específicas para playlist-details.html
window.addToFavorites = function() {
    if (currentSongId) {
        const songItem = document.querySelector(`[data-song-id="${currentSongId}"]`).closest('.song-item');
        const songTitle = songItem.querySelector('.song-title').textContent;
        const songArtist = songItem.querySelector('.song-artist').textContent;
        
        // Efecto visual en el botón de favoritos
        const heartBtn = songItem.querySelector('.song-action-btn i.fa-heart');
        if (heartBtn) {
            heartBtn.style.color = '#e74c3c';
            setTimeout(() => {
                heartBtn.style.color = '';
            }, 200);
        }
        
        alert(`"${songTitle}" de ${songArtist} agregada a Canciones que te gustan`);
    }
    if (contextMenu) {
        contextMenu.classList.remove('show');
    }
};

window.downloadSong = function() {
    if (currentSongId) {
        const songItem = document.querySelector(`[data-song-id="${currentSongId}"]`).closest('.song-item');
        const songTitle = songItem.querySelector('.song-title').textContent;
        const songArtist = songItem.querySelector('.song-artist').textContent;
        
        alert(`Descargando "${songTitle}" de ${songArtist}...`);
    }
    if (contextMenu) {
        contextMenu.classList.remove('show');
    }
};

// Función para actualizar números de canciones después de eliminar
function updateSongNumbers() {
    const songItems = document.querySelectorAll('.song-item');
    songItems.forEach((item, index) => {
        const numberElement = item.querySelector('.song-number');
        if (numberElement) {
            numberElement.textContent = index + 1;
        }
    });
}

// Funcionalidad del menú contextual para favorites.html
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('favorites.html')) {
        contextMenu = document.getElementById('contextMenu');
        
        // El menú contextual se maneja en el event listener global de context-menu-btn
        
        // Cerrar menú al hacer scroll
        window.addEventListener('scroll', function() {
            if (contextMenu) {
                contextMenu.classList.remove('show');
            }
        });
        
        // Funcionalidad de hover para reproducir y ver detalles
        const songItems = document.querySelectorAll('.song-item');
        songItems.forEach(item => {
            // Click en la imagen para reproducir
            const songImage = item.querySelector('.song-image');
            if (songImage) {
                songImage.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const songTitle = item.querySelector('.song-title').textContent;
                    const songArtist = item.querySelector('.song-artist').textContent;
                    
                    // Efecto visual
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                    
                    // Simular reproducción
                    setTimeout(() => {
                        alert(`Reproduciendo: ${songTitle} - ${songArtist}`);
                    }, 200);
                });
            }
            
            // Click en el título o artista para ver detalles
            const songTitle = item.querySelector('.song-title');
            const songArtist = item.querySelector('.song-artist');
            
            if (songTitle) {
                songTitle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const artist = item.querySelector('.song-artist').textContent;
                    
                    // Efecto visual
                    this.style.color = '#2a9d8a';
                    setTimeout(() => {
                        this.style.color = '';
                    }, 200);
                    
                    // Simular navegación a detalles
                    setTimeout(() => {
                        alert(`Abriendo detalles de: ${this.textContent} - ${artist}`);
                    }, 200);
                });
            }
            
            if (songArtist) {
                songArtist.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const title = item.querySelector('.song-title').textContent;
                    
                    // Efecto visual
                    this.style.color = '#2a9d8a';
                    setTimeout(() => {
                        this.style.color = '';
                    }, 200);
                    
                    // Simular navegación a detalles
                    setTimeout(() => {
                        alert(`Abriendo detalles de: ${title} - ${this.textContent}`);
                    }, 200);
                });
            }
        });
    }
});

// ===== FUNCIONALIDAD DE CALIFICACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    const ratingStars = document.querySelectorAll('#ratingStars i');
    const ratingText = document.getElementById('ratingText');
    const ratingSubmitBtn = document.getElementById('ratingSubmitBtn');
    let currentRating = 0;

    if (ratingStars.length > 0) {
        ratingStars.forEach((star, index) => {
            star.addEventListener('click', function() {
                currentRating = parseInt(this.dataset.rating);
                updateRatingDisplay();
                ratingSubmitBtn.disabled = false;
            });

            star.addEventListener('mouseenter', function() {
                const hoverRating = parseInt(this.dataset.rating);
                highlightStars(hoverRating);
            });
        });

        document.getElementById('ratingStars').addEventListener('mouseleave', function() {
            highlightStars(currentRating);
        });

        ratingSubmitBtn.addEventListener('click', function() {
            if (currentRating > 0) {
                this.innerHTML = '<i class="fas fa-check"></i> Calificación enviada';
                this.style.background = '#45b7b8';
                this.disabled = true;

                ratingText.textContent = `¡Gracias por tu calificación de ${currentRating} estrellas!`;
                ratingText.style.color = '#2a9d8a';
            
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            }
        });
    }

    function updateRatingDisplay() {
        const ratingTexts = [
            '',
            'Muy malo',
            'Malo', 
            'Regular',
            'Bueno',
            'Excelente'
        ];
        
        ratingText.textContent = ratingTexts[currentRating];
        highlightStars(currentRating);
    }

    function highlightStars(rating) {
        ratingStars.forEach((star, index) => {
            if (index < rating) {
                star.className = 'fas fa-star';
            } else {
                star.className = 'far fa-star';
            }
        });
    }
});

// Funcionalidad específica para playlist-details.html
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('playlist-details.html')) {
        // Funcionalidad de hover para reproducir y ver detalles
        const songItems = document.querySelectorAll('.song-item');
        songItems.forEach(item => {
            // Click en la imagen para reproducir
            const songImage = item.querySelector('.song-image');
            if (songImage) {
                songImage.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const songTitle = item.querySelector('.song-title').textContent;
                    const songArtist = item.querySelector('.song-artist').textContent;
                    
                    // Efecto visual
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                    
                    // Simular reproducción
                    setTimeout(() => {
                        alert(`Reproduciendo: ${songTitle} - ${songArtist}`);
                    }, 200);
                });
            }
            
            // Click en el título o artista para ver detalles
            const songTitle = item.querySelector('.song-title');
            const songArtist = item.querySelector('.song-artist');
            
            if (songTitle) {
                songTitle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const artist = item.querySelector('.song-artist').textContent;
                    
                    // Efecto visual
                    this.style.color = '#2a9d8a';
                    setTimeout(() => {
                        this.style.color = '';
                    }, 200);
                    
                    // Simular navegación a detalles
                    setTimeout(() => {
                        alert(`Abriendo detalles de: ${this.textContent} - ${artist}`);
                    }, 200);
                });
            }
            
            if (songArtist) {
                songArtist.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const title = item.querySelector('.song-title').textContent;
                    
                    // Efecto visual
                    this.style.color = '#2a9d8a';
                    setTimeout(() => {
                        this.style.color = '';
                    }, 200);
                    
                    // Simular navegación a detalles
                    setTimeout(() => {
                        alert(`Abriendo detalles de: ${title} - ${this.textContent}`);
                    }, 200);
                });
            }
        });
    }
});