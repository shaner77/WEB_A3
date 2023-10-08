import cv2
import os
import tkinter

#https://stackoverflow.com/questions/56183201/detect-and-visualize-differences-between-two-images-with-opencv-python

m = tkinter.Tk()
m.mainloop()
# load images
dir = os.path.dirname(os.path.realpath(__file__))
#print("{:s}\leftImage.jpg".format(dir))
#print(dir + "\leftImage.jpg")
#print(os.path.isfile("{:s}\leftImage.jpg".format(dir)))
image1 = cv2.imread(dir + "\s1.png")
image2 = cv2.imread(dir + "\\" + "s2.png")

height, width = image1.shape[:2]

# Scale the image by a factor of 2
image1 = cv2.resize(image1, (int(width/2), int(height/2)))
image2 = cv2.resize(image2, (int(width/2), int(height/2)))
#cv2.resizeWindow("image 1", 1000, 400)

cv2.imshow("image 1", image1)
cv2.moveWindow('image 1', 0, 0)
cv2.imshow("image 2", image2)
cv2.moveWindow('image 2', 0, 0)
cv2.waitKey(0)

# compute difference
difference = cv2.subtract(image1, image2)

# color the mask red
Conv_hsv_Gray = cv2.cvtColor(difference, cv2.COLOR_BGR2GRAY)
ret, mask = cv2.threshold(Conv_hsv_Gray, 0, 255,cv2.THRESH_BINARY_INV |cv2.THRESH_OTSU)
difference[mask != 255] = [200, 200, 200]

# add the red mask to the images to make the differences obvious
image1[mask != 255] = [0, 0, 255]
image2[mask != 255] = [0, 0, 255]

# store images
cv2.imwrite('diffOverImage1.png', image1)
cv2.imwrite('diffOverImage2.png', image1)
cv2.imwrite('diff.png', difference)

cv2.imshow("Subtracted", difference)
cv2.waitKey(0)