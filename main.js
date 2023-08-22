// x value of right & left hand wrist
rwristx = 0;
lwristx = 0;

// y value of right & left hand wrist
rwristy = 0;
lwristy = 0;

// these variables are used to know whether hand wrists' are present infront of camera
scorel = 0;
scorer = 0;

//this variable is used to know which song is playing
song_number = 1;

//array for uploading songs
music = ["",""];

//this variable is used to setup the status everytime when song is changed
music_name = ["music","Chill","Rock","Cool","Its Real"]


function preload(){
    // uploading songs
    a = loadSound("a.mp3");
    b = loadSound("b.mp3");
    c = loadSound("c.mp3");
    d = loadSound("d.mp3");
    e = loadSound("e.mp3");
    music = [a,b,c,d,e];
}
function setup(){
    //create canvas
    canvas = createCanvas(700,500);
    canvas.center();

    //create video
    video = createCapture(VIDEO);
    video.hide();
    if(!video){
        console.error("video error. Try Reload")
    }

    //loading posenet
    posenet = ml5.poseNet(video, modelLoaded);
    if(!posenet){
        console.error("Error dealing with posenet.",)
    }
    try{
    posenet.on('pose',gotPoses)
    }catch (error){
        console.error("Posenet model error"+error)
    }
    
}
function modelLoaded()
{   // cheaking if model loaded
    console.log("modelLoaded")
}
function draw(){
    //inserting video into canvas
    image(video, 0, 0, 700, 500);
    fill("White");
    stroke("blue");
    
    //checking if wrist is in front of camera
    if(scorel >= 0.3){
        //if left wrist is in front. draw circle and call song()
        circle(lwristx,lwristy,20);
        song(false)
    }
    else if(scorer >= 0.3 )
    {   //if right wrist is in front. draw circle and call song()
        circle(rwristx,rwristy,20);
        song(true)
    }
    
}
function song(next_or_previous)
{
    //cheaking if the music is playing
    is = music[sn].isPlaying;
    if (is){
        // if so, check if the song switching is previous or next
        if(!next_or_previous)
        {   
            //if previous, console status, stop music, call the check_song_no() for checking if the song_number variable is less than
            //the music array again console status play previous music
            console.log("1)music number is: "+song_number)
            music[song_number].stop()
            next_music = check_song_no(song_number,next_or_previous);
            music[next_music].play()
            console.log("2)music number is: "+next_music)
            song_number = next_music;
        }else if(next_or_previous)
        {
            //if next, console status, stop music, call the check_song_no for checking if the song_number variable is greater than 
            // the music array again console status play next music
            console.log("1)music number is: "+song_number)
            music[song_number].stop()
            next_music = check_song_no(song_number,next_or_previous);
            music[next_music].play()
            console.log("2)music number is: "+next_music)
            song_number = next_music;
        }
    }
    // setting up the status---here we do call check_song_no() because when we set the previous and next song we don't want to mess it
    check_song1 = check_song_no(next_music,false);
    check_song2 = check_song_no(next_music,true);
    document.getElementById("previous").innerHTML = "Previous Song : "+music_name[check_song1];
    document.getElementById("next").innerHTML = "Next Song : "+music_name[check_song2];
    document.getElementById("now").innerHTML = "Now Playing : "+music_name[song_number];



    // stoping user from changing music again by makeing a do while loop
    

    // the waitingInterval loop logic is to tell the user every second how much time is left to switch to next or previous music

    waiting_time = 10;
    waitingInterval = setInterval(() => {
        if (waiting_time <= 0) {
            clearInterval(waitingInterval);
            document.getElementById("btn").innerHTML = "You can switch to next or Previous song now.";
        } else {
            console.log("waiting Time Left: " + waiting_time + "s");
            document.getElementById("btn").innerHTML = "You can switch to next or Previous song after " + waiting_time + "s";
            waiting_time--;
        }
    }, 1000);

}
function check_song_no(song_number,next_or_previous)
{   //cheacking if the user want to go to next or previous music
    if(next_or_previous)
    {
        //if next, then checking if song_number equals music array's length
        if(song_number == music.length)
        {   //if equal then setting it to -1 so then the  song will go last to first
            new_song_no = -1
            return new_song_no+1;
        }
        else
        {   //if not equal, then do nothing, just give the song_number back
            return song_number+1;
        }
    }   //cheacking if the user want to go to next or previous music
    else if(!next_or_previous)
    {   //here we are changing value of music's length to a negative value
        //because we want know that song_number reached that stage by changing to previous song
        music_sting = "-"+music.length
        music_sting = music_sting.toString()
        music_negative_length = Number(music_sting)

            //here we are checking if the song_number is equal to the negative value of music array
        if(song_number == music_negative_length)
        {   //if equal, then setting it to 1 so that it will do first to second(because you know the array index is like that)
            new_song_no = 1;
            return new_song_no-1;
        }
        else
        {   //if not equal, then do nothing, just give the song_number back
            return song_number-1;
        }
    }
}
function play()
{   //playing song number one when button is clicked and called play
    song_number = 0;
    music[song_number].play();
}
function gotPoses(result)
{   //if result is empty do not enter
    if(result.length)
    {   // get value to essential variabels
        w = result[0].pose
        rw = w.rightWrist
        lw = w.leftWrist

        rwristx = rw.x;
        rwristy = rw.y;

        lwristx = lw.x;
        lwristy = lw.y;

        scorel = w.keypoints[9].score
        scorer = w.keypoints[10].score
    }
}