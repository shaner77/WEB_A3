/*--------------------------------------------------------------------------------------------------------
 Name: Shane Riley
 Student ID: 200585028
 Date: 2023-10-02
 Details: An application to use Ohms Law to calulate various values or verify the values a user enters.
--------------------------------------------------------------------------------------------------------*/

#include <iostream>
#include <string>
#include <limits> //I used this library to fix issues I was having with clearing the input buffer

using namespace std;

// Function to calculate Ohm's Law based on user input
double calculateOhmsLaw(double voltage, double current, double resistance) {

    double returnval;   //Variable to hold the value we want to return
    if(voltage == 0){   //Check if Voltage is still 0, if so, we are trying to calculate it
        returnval = current * resistance;
    } else if(current == 0){    //Check if current is still 0, if so, we are trying to calculate it
        returnval = voltage / resistance;
    } else if(resistance == 0){ //Check if resistance is still 0, if so, we are trying to calculate it
        returnval = voltage / current;
    } else{ //Otherwise, we have all 3 values, we are verifying Ohms Law
        (((current*resistance)-voltage) != 0)?(returnval = -1):(returnval = 0); //if equation does not equal 0, combination is invalid, return -1
    }
    return returnval;   //return whatever value we were trying to calculate or find
}

//main function used to create variables passed to calculator function and perform repetition
int main(){
    char repeat = 'y';  //set repeat value to yes
    do {
        bool error = false; //create error variable to test if inputs are valid (within range + numeric)
        double voltage = 0, current = 0, resistance = 0, all3 = 0; // Variables to store user input
        int select; //variable to hold conversion type value
        
        // get user input for V&I, or V&R or I&R    
        cout << "\n\nSelect the conversion type:\n[1] V & I \n[2] V & R \n[3] I & R \n[4] Verify V=I*R \nEnter: ";
        cin >> select;  //set select equal to user entered conversion type value
        
        if((select<1)||(select>4)){ //check if the value entered is outside the range of options
            std::cin.setstate(std::ios_base::failbit);  //if so, we set the fail bit so we can check cin.fail(). Typically it only checks for correct data type
        }
        if (cin.fail()){    //check if select value is of the correct type (int) AND is within range
            bool valid = false; //if select value wasn't valid, we set this so we can loop until it's fixed
            while (valid == false){
                cin.clear();    //clear out anything in buffer
                cout << "\nInvalid Entry!\nSelect the conversion type:\n[1] - V & I \n[2] - V & R \n[3] - I & R \n[4] - ALL 3 \nEnter: ";
                cin.get();  //forces loop to wait for a user entry (followed by enter key)
                cin >> select;
                if ((!cin.fail())&&(select<5)&&(select>0)){ //check if the new value entered meets the conditions required
                    valid = true;   //if so, set this to true to end the loop and move on
                }
            }
        }
        switch (select) {   //switch statement so we can ask the user for the variables corresponding to the conversion type they chose
            case 1: //select = 1, given v and i
                cout<<"\nSelected: V/I = R";   
                cout << "\nEnter Voltage (V): ";
                cin >> voltage;
                if(cin.fail()){ //verify that the values entered are valid (numeric)
                    error=true; //if not, set error indicator to true for later
                    break;  //exit loop now so user doesn't enter more numbers unnecessarily
                }cout << "Enter Current (A): ";
                cin >> current;
                (cin.fail())?(error = true):(false);    //verify that the values entered are valid (numeric)
                break;  //break the switch so we only check this case
            case 2: 
                cout<<"\nSelected: V/R = I";  
                cout << "\nEnter Voltage (V): ";
                cin >> voltage;        
                if(cin.fail()){ //verify that the values entered are valid (numeric)
                    error=true; //if not, set error indicator to true for later
                    break;  //exit loop now so user doesn't enter more numbers unnecessarily
                }cout << "Enter Resistance (Ω): ";
                cin >> resistance;
                (cin.fail())?(error = true):(false);    //verify that the values entered are valid (numeric)
                break;  //break the switch so we only check this case
            case 3:
                cout<<"\nSelected: I*R = V";  
                cout << "\nEnter Current (A): ";
                cin >> current;                
                if(cin.fail()){ //verify that the values entered are valid (numeric)
                    error=true; //if not, set error indicator to true for later
                    break;     //exit loop now so user doesn't enter more numbers unnecessarily
                }cout << "Enter Resistance (Ω): ";
                cin >> resistance;   
                (cin.fail())?(error = true):(false);    //verify that the values entered are valid (numeric)
                break;  //break the switch so we only check this case
            case 4:
                cout<<"\nSelected: Verify V = I*R";  
                cout << "\nEnter Voltage (V): ";
                cin >> voltage;    
                if(cin.fail()){ //verify that the values entered are valid (numeric)
                    error=true; //if not, set error indicator to true for later
                    break;      //exit loop now so user doesn't enter more numbers unnecessarily
                }cout << "Enter Current (A): ";
                cin >> current;                   
                if(cin.fail()){ //verify that the values entered are valid (numeric)
                    error=true; //if not, set error indicator to true for later
                    break;      //exit loop now so user doesn't enter more numbers unnecessarily
                }cout << "Enter Resistance (Ω): ";
                cin >> resistance; 
                (cin.fail())?(error = true):(false);    //verify that the values entered are valid (numeric)
                break;
        }
        cin.clear();
        if(error == true){  //check if the previous loop exited because of an error
            cin.clear();    
            cout<<"\nERROR: invalid value! Start again? [y/n]: ";   //check if calculation should be repeated
            cin.get();  //wait for user response
            cin >> repeat;
        }
        else {  //switch did not end because of an error

            // Call the calculateOhmsLaw function to perform the calculation
            double result = calculateOhmsLaw(voltage, current, resistance);

            // Check the result and display the output
            if(result==0){  //if we return 0 we were checking the 3 values and they were a valid combination
                cout<<"Values are correct. Ohm's Law is satisfied.";
            } else if (result==-1){ //if we return -1 we were checking the 3 values and they were not a valid combination
                cout<<"Values are not correct. Ohm's Law is not satisfied.";
            } else{ //we were calculating a specific value
                if (select == 1){   //indicates we were calculating resistance
                    cout<<"Given V = "<<voltage <<"V and I = "<<current<<"A, Ohm's Law states that R = "<<result<<"Ω";
                } else if(select ==2){   //indicates we were calculating current
                    cout<<"Given V = "<<voltage <<"V and R = "<<resistance<<"Ω, Ohm's Law states that I = "<<result<<"A";
                } else{   //indicates we were calculating voltage
                    cout<<"Given I = "<<current <<"A and R = "<<resistance<<"Ω, Ohm's Law states that V = "<<result<<"V";
                }
            }

            // Ask the user if they want to repeat the calculation
            cout << "\n\nDo you want to do another calculation? [y/n]: ";
            cin >> repeat;
        }
        cin.ignore(numeric_limits<streamsize>::max(),'\n');// Clear the input buffer
    } while (repeat == 'Y' || repeat == 'y');   //if user said y to repeat the calculation then the while loop will run again  
    return 0;
}
