#include <iostream>
#include <cmath>

using namespace std;

int galToLit(double gals, float litFactor){
    cout << (gals) << " Gallons = " << (gals*litFactor) << " Litres.";
    return 0;
}

int litToGal(double lits, float galFactor){
    cout << (lits) << " Litres = " << (lits*galFactor) << " Gallons.";
    return 0;
}

int main(){
    const float galFactor = 3.785;
    const float litFactor = 0.264;
    double select, number;
    bool cont = 'y';
    while (cont == 'y'){}

        cout << "\n\nEnter the conversion type [1 - gal to lit] [2 - lit to gal]: ";
        cin >> select;
        
        cout << "Enter the number to convert: ";
        cin >> number;
        (select == 1)?galToLit(number, galFactor):litToGal(number, litFactor);

        cout << "\n\nContinue [y/n]: ";
        cin >> cont;

    return 0;


}