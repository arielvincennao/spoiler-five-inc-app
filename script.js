// Estado global del reproductor
let playerState = {
    isPlaying: false,
    currentSong: 'Canción Actual',
    currentArtist: 'Artista - Álbum',
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
                    playPauseBtn.style.background = '#1db954';
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

// Función para verificar que ambos reproductores estén sincronizados
function syncPlayers() {
    const players = document.querySelectorAll('.player');
    if (players.length > 1) {
        console.log('Se detectaron múltiples reproductores, sincronizando...');
        // Aplicar el mismo estado a todos los reproductores
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
                    playPauseBtn.style.background = '#1db954';
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

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
        logo.style.cursor = 'pointer';
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
            this.innerHTML = '<i class="fas fa-pause"></i>';
            this.style.background = '#ffffff';
            this.style.color = '#4ecdc4';
            
            // Actualizar estado del reproductor
            const card = this.closest('.content-card');
            const title = card.querySelector('.card-title');
            const subtitle = card.querySelector('.card-subtitle');
            
            if (title && subtitle) {
                playerState.currentSong = title.textContent;
                playerState.currentArtist = subtitle.textContent;
                playerState.isPlaying = true;
                playerState.currentTime = 0;
                playerState.progress = 0;
                playerState.startTime = null;
                
                // Establecer duración basada en el tipo de contenido
                if (title.textContent.includes('Playlist') || title.textContent.includes('Hora de Gym')) {
                    playerState.duration = 105 * 60; // 1h 45min para playlists
                } else {
                    playerState.duration = 240; // 4 minutos por defecto para canciones individuales
                }
                
                applyPlayerState();
            }
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-play"></i>';
                this.style.background = '#2a9d8a';
                this.style.color = '#ffffff';
            }, 3000);
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

    // Menús contextuales
    const contextMenuButtons = document.querySelectorAll('.context-menu-btn');
    contextMenuButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const menu = this.nextElementSibling;
            if (menu && menu.classList.contains('context-menu')) {
                // Cerrar otros menús
                document.querySelectorAll('.context-menu').forEach(otherMenu => {
                    if (otherMenu !== menu) {
                        otherMenu.style.opacity = '0';
                        otherMenu.style.visibility = 'hidden';
                        otherMenu.style.transform = 'translateY(10px)';
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
        if (!e.target.closest('.context-menu-container') && !e.target.closest('.context-menu-btn')) {
            document.querySelectorAll('.context-menu').forEach(menu => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(10px)';
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
                const searchTerm = this.value;
                if (searchTerm.trim()) {
                    alert(`Buscando: "${searchTerm}"`);
                }
            }
        });
    }

    // Notificaciones
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            this.style.background = '#2a9d8a';
            setTimeout(() => {
                this.style.background = 'rgba(255, 255, 255, 0.1)';
            }, 200);
            alert('Notificaciones');
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
            
            alert('Perfil de usuario');
        });
    }

    // Barra de progreso
    const progressBar = document.querySelector('.progress-bar');
    const progressFill = document.querySelector('.progress-fill');
    
    if (progressBar && progressFill) {
        progressBar.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = (clickX / rect.width) * 100;
            progressFill.style.width = percentage + '%';
            
            // Actualizar estado del reproductor
            if (playerState.duration > 0) {
                playerState.progress = Math.max(0, Math.min(100, percentage));
                playerState.currentTime = (playerState.progress / 100) * playerState.duration;
                
                const currentTimeDisplay = document.querySelector('.current-time');
                if (currentTimeDisplay) {
                    currentTimeDisplay.textContent = secondsToTime(playerState.currentTime);
                }
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
            } else {
                playerState.isPlaying = false;
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                this.style.background = '#2a9d8a';
            }
            applyPlayerState();
        });
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


        document.querySelectorAll('.song-item').forEach(item => {
            item.addEventListener('click', function() {
                const title = this.querySelector('.song-title').textContent;
                const artist = this.querySelector('.song-artist').textContent;
                const durationText = this.querySelector('.song-duration').textContent;
                

                playerState.currentSong = title;
                playerState.currentArtist = artist;
                playerState.isPlaying = true;
                playerState.currentTime = 0;
                playerState.progress = 0;
                playerState.startTime = null;
                playerState.duration = timeToSeconds(durationText);
                applyPlayerState();
                
                alert(`Reproduciendo: ${title}`);
            });
        });


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
