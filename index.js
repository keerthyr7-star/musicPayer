

        let audioPlayer = document.getElementById("audioPlayer");
        let previous = document.getElementById("previous");
        let play = document.getElementById("play");
        let next = document.getElementById("next");
        let progressBar = document.querySelector(".progressBar")
        let timebarSpan = document.querySelectorAll(".timebar span")
        let songTitle = document.querySelector(".head")
        let artistName = document.querySelector(".parent")


        debugger
        function format(sec){
           
            debugger
            let m = Math.floor(sec / 60);
            debugger
            let s = Math.floor(sec % 60);
            debugger
            if(s < 10) s = "0" + s;
            debugger
            return `${m}:${s}`;
        }

        function updateSongDetails(song){
            songTitle.innerText = song.title
            artistName.innerText = song.user.name
        }

        let loadData = async () => {
            try{
                let resData = await fetch('https://discoveryprovider.audius.co/v1/tracks/trending?app_name=myapp');

                let final_res = await resData.json();
                console.log(final_res);

                let songsArray = final_res.data.map((ele)=>{

                    return`
                        <div class="mainCardText">
                        <h6 class="head">Song name: ${ele.title}</h6>
                        <p class="parent">Artist name:${ele.user.name}</p>
                        </div>
                    `
                }).join('')
                document.querySelector(".songsContainer").innerHTML = songsArray

               let currentIndex = 0;
               let lastIndex = final_res.data.length - 1

              
               let isPlaying = false
                play.addEventListener("click", () =>{

                    let currentSong = final_res.data[currentIndex]
                    audioPlayer.src = `https://discoveryprovider.audius.co/v1/tracks/${final_res.data[currentIndex].id}/stream?app_name=myapp`

                    updateSongDetails(currentSong)

                   if(!isPlaying){
                    
                        audioPlayer.play()
                        isPlaying = true
                        play.innerHTML = '<i class="fa-solid fa-pause"></i>'
                   }
                   else{
                        audioPlayer.pause()
                        isPlaying = false
                         play.innerHTML = '<i class="fa-solid fa-play"></i>'
                   }

                })

                
                 audioPlayer.addEventListener("loadedmetadata", () =>{
                    timebarSpan[1].innerText = format(audioPlayer.duration)
                 })

                 audioPlayer.addEventListener("timeupdate", () => {
                    timebarSpan[0].innerText = format(audioPlayer.currentTime);

                    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                });


                progressBar.addEventListener("input", () => {
                audioPlayer.currentTime =
                (progressBar.value / 100) * audioPlayer.duration;
                });

                
                
                previous.addEventListener("click", () =>{
                if(currentIndex > 0){
                    currentIndex --
                }else{
                    currentIndex = lastIndex
                }
                 let currentSong = final_res.data[currentIndex]

                audioPlayer.src = `https://discoveryprovider.audius.co/v1/tracks/${final_res.data[currentIndex].id}/stream?app_name=myapp`

                  updateSongDetails(currentSong); 
                audioPlayer.play()
                isPlaying = true
                
            })
                
            next.addEventListener("click", () =>{
                if(currentIndex < final_res.data.length -1){
                    currentIndex ++
                }else{
                    currentIndex = 0
                }

                let currentSong = final_res.data[currentIndex];

                 audioPlayer.src = `https://discoveryprovider.audius.co/v1/tracks/${final_res.data[currentIndex].id}/stream?app_name=myapp`
                 audioPlayer.play()

                 updateSongDetails(currentSong); 

                 isPlaying = true
            })
            console.log(currentIndex);
            console.log(lastIndex);
             console.log(songTitle, artistName);
            
            }catch(err){
                alert("data no received")
            }
        }

        loadData()


  