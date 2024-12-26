from flask import Blueprint,redirect,json
import winsound
import pywhatkit
from . import streaming
from utils.ApiResponse import ApiResponse
import os

number = "+91xx"

Notify=Blueprint("Notify",__name__,url_prefix="/api/v1/Notify")

# Create your views here.
def homepage(request):
    if request.method == "POST":
        message = request.POST["message"]
        print()
        print(message)
        print()

        pywhatkit.sendwhatmsg_instantly(number, message, wait_time=10)
        return redirect("/")

    # if os.path.exists("Sus/Threat.jpg"):
    # return render(request, "index.html")



def alert(request):
    if os.path.exists("Sus/Threat.jpg"):

        frequency = 2500  # Set Frequency To 2500 Hertz
        duration = 500
        # Set Duration To 1000 ms == 1 second

        winsound.Beep(frequency, duration)
        # response = 1
        return json({"status": 1})

    else:
        return json({"status": 0})


def log(request):
    if request.method == "POST":
        with open("alerts.json", "a+") as file:
            file.write("Alert Triggered")
    return ApiResponse("Logged",200,)


def video_feed(request):
    cam = streaming.VideoCamera()
    # try:
    #     # return StreamingHttpResponse(
    #     #     streaming.gen(cam), content_type="multipart/x-mixed-replace;boundary=frame"
    #     # )
    # except:
    #     print("Some Error Occurred")


def inform(request):
    if os.path.exists("Sus/Threat.jpg"):
        pywhatkit.sendwhats_image(number, "Sus/Threat.jpg", "Threat Detected!")
    return ApiResponse("Inform",200,)

