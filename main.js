rwristx = 0;
lwristx = 0;
rwristy = 0;
lwristy = 0;
scorel = 0;
scorer = 0;
sn = 1;
music = ["",""];
mname = ["music","Chill","Rock","Cool","Its Real"]


function preload(){
    a = loadSound("a.mp3");
    b = loadSound("b.mp3");
    c = loadSound("c.mp3");
    d = loadSound("d.mp3");
    e = loadSound("e.mp3");
    music = [a,b,c,d,e];
}
function setup(){
    canvas = createCanvas(700,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose',gotPoses)
}
function modelLoaded()
{
    console.log("modelLoaded")
}
function draw(){
    image(video, 0, 0, 700, 500);
    fill("White");
    stroke("blue");
    
    if(scorel >= 0.3){
        circle(lwristx,lwristy,20);
        song(false)
    }
    else if(scorer >= 0.3 )
    {
        circle(rwristx,rwristy,20);
        song(true)
    }
    
}
function song(which)
{
    
    is = music[sn].isplaying;
    if (is){
        if(!which)
        {   console.log("1)music number is: "+sn)
            music[sn].stop()
            m = checksn(sn,which); sn = m;
            console.log("2)music number is: "+sn)
            music[sn--].play()
        }else if(which)
        {   console.log("1)music number is: "+sn)
            music[sn].stop()
            m = checksn(sn,which); sn = m;
            console.log("2)music number is: "+sn)
            music[sn++].play()
        }
        time = 10
        console.log(time)
        do{
            setTimeout(() => {
                // Code to be executed after 1 second
                console.log(time)
                document.getElementById("btn").innerHTML = "You can switch to next or Previous song after "+time+"s";
                time--
              }, 1000);
        }
        while(time)

    }
    document.getElementById("previous").innerHTML = "Previous Song : "+mname[sn-1];
    document.getElementById("next").innerHTML = "Next Song : "+mname[sn+1];
    document.getElementById("now").innerHTML = "Now Playing : "+mname[sn];
}
function checksn(s,w)
{
    if(s == music.length)
    {   if(w)
        {
            sm = -1
            return sm;
        }
        else
        {
            return s;
        }
    }
    else if(s == -music.length)
    {
        if(w)
        {
            sm = -1
            return sm;
        }
        else
        {
            return s;
        }
    }
}
function play()
{
    sn = 0;
    music[sn].play();
    music[sn].setVolume(0.25);
}
function gotPoses(result)
{
    if(result.length != 0)
    {
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
