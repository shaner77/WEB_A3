
/*--------------------------------------------------------------------------------------------------------
 Name: Shane Riley
 Student ID: 200585028
 Date: 2023-09-13
 Details: Outputs a mock traffic light system
--------------------------------------------------------------------------------------------------------*/

#include <iostream>  //import iostream so we can output to terminal
#include <unistd.h> //import unistd so we can use the sleep function

using namespace std; //sets standard namespace so \we don't have to write std:: every time


void draw(int state){               // draw function to c reate stoplight images
    if(state==0){                   // check if counter is at 0, indicates GREEN
        cout<<"\n\n\n\n";       // start by moving light down the page so no other images interfere with it
        cout<<"   Green   ";    // output the colour label
        cout<<"\n   ____";      // output the top of the light
        cout<<"\n  |    |";     // output the side of the light
        cout<<"\n  | ⚪ | ";     // output the red light space (unlit)
        cout<<"\n  | ⚪ | ";    // output the red light space (unlit)
        cout<<"\n  | 🟢 |";     // output the red light space (lit)
        cout<<"\n  |____|";     // output the bottom of the light
    }                           // closes if condition
    else if(state==1){              // check if counter is at 1, indicates YELLOW
        cout<<"\n\n\n\n";       // start by moving light down the page so no other images interfere with it
        cout<<"   Yellow   ";   // output the colour label
        cout<<"\n   ____";      // output the top of the light
        cout<<"\n  |    |";     // output the side of the light
        cout<<"\n  | ⚪ | ";   // output the red light space (unlit)
        cout<<"\n  | 🟡 | ";    // output the yellow light space (lit)
        cout<<"\n  | ⚪ |";     // output the green light space (unlit)
        cout<<"\n  |____|";     // output the bottom of the light
    }                           // closes else if condition
    else{                       // else condition, indicates RED
        cout<<"\n\n\n\n";       // start by moving light down the page so no other images interfere with it
        cout<<"   Red   ";      // output the colour label
        cout<<"\n   ____";      // output the top of the light
        cout<<"\n  |    |";     // output the side of the light
        cout<<"\n  | 🔴 | ";    // output the red light space (lit)
        cout<<"\n  | ⚪ | ";   // output the yellow light space (unlit)
        cout<<"\n  | ⚪ |";    // output the green light space (unlit)
        cout<<"\n  |____|";    // output the bottom of the light
    }                           // closes else condition
    cout<<"\n    ||";           // output the light post
    cout<<"\n    ||";           // output the light post
    cout<<"\n    ||";           // output the light post
    cout<<"\n    ||";           // output the light post
    cout<<"\n    ||";           // output the light post
    cout<<"\n    ||";           // output the light post
    cout<<"\n ________\n";        // output the base of the post
    (state%2==0)?sleep(5):sleep(2); // if the counter value is even (red(2) or green(0))sleep for 5, otherwise sleep for 2
    return;                     // return statement to end function and return to main
}                               // closes draw function


int main() {                    // main function to run main while loop and update counter
    int state = 0;                  // create counter variable to track what stage in the light we're at
    while(1){                   // while loop set to keep looping forever
        draw(state);                // calls draw function to output the light and label
        (state==2)?state=0:state++;         // if counter variable n is 2 (red), we reset it to 0
    }                           // closes while loop
    return 0;                   // return 0 to end the main function (is never reached)
}                               // closes main function
