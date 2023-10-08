#include <iostream>
#include <string>
#include <cmath>
using namespace std;
//================================================================================================
// Example 01: How to include the string header file & How to define and initialize a string variable
//================================================================================================
void example01() {
    std::string myString = "Hello, World!";
    std::cout << myString << std::endl;
}
//================================================================================================
// Example 02: Use the getline() function to read a full name
//================================================================================================
void example02() {
    std::string fullName;
    std::cout << "Enter your full name: ";
    std::getline(std::cin, fullName);
    std::cout << "Hello, " << fullName << "!" << std::endl;
}
//================================================================================================
// Example 03: How to chain extraction expressions
//================================================================================================
void example03() {
    int num1, num2, num3;
    std::cout << "Enter three numbers: ";
    std::cin >> num1 >> num2 >> num3;
    std::cout << "Sum: " << num1 + num2 + num3 << std::endl;
}
//================================================================================================
// Example 04: One cmath function with sqrt/pow/round/floor/ceil in it
//================================================================================================
void example04() {
    double x = 25.0;
    double result = std::sqrt(x);
    std::cout << "Square root of " << x << " is " << result << std::endl;
}
//================================================================================================
// Example 05: A using directive for the std namespace
//================================================================================================
void example05() {
    using namespace std;
    int num = 7;    
    double root = sqrt(num);
    root = round(root * 1000) / 1000;   // round to 3 decimal places
    cout << "The square root of " << num << " is " << root << endl;

}
//================================================================================================
// Example 06: Using declarations for four members of the std namespace
//================================================================================================
void example06() {

    using std::cout;
    using std::sqrt;
    using std::round;
    using std::endl;
    
    cout << "Using declarations: " << sqrt(25.0) << " " << round(3.14) << endl;
}
//================================================================================================
// Main call each function 1-by-1
//================================================================================================

int main() {
    int maxSlides = 6; // Change this to the maximum example number
    for (int exampleNumber = 1; exampleNumber <= maxSlides; exampleNumber++) {
        // Call the corresponding example function
        cout << "Example " << exampleNumber << ":\n";
        switch (exampleNumber) {
            case 1:  example01(); break;
            case 2:  example02(); break;
            case 3:  example03(); break;
            case 4:  example04(); break;
            case 5:  example05(); break;
            case 6:  example06(); break;
            //case 7:  example07(); break;
            //case 8:  example08(); break;
            //case 9:  example09(); break;
            //case 10: example10(); break;
            //case 11: example11(); break;
            //case 12: example12(); break;
            //case 13: example13(); break;
            //case 14: example14(); break;                        
            
        }
        cout << "\nPress Enter to continue...\n";
        cin.get(); // Wait for user to press Enter
    }
}
