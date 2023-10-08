#include <iostream>
#include <iomanip>

using namespace std;

int main(){

    cout<<"\nInvoice Calculator"<<endl;
    cout<<"------------------"<<endl;

    double subtotal;

    cout<<"Enter Subtotal: $";
    cin>>subtotal;

    if (cin.fail()){
        return 0;
    }

    double discount_percent;

    if (subtotal >= 200){
        discount_percent = 0.2;
    } else  if (subtotal >= 100){
        discount_percent = 0.1;
    } else {
        discount_percent = 0.05;
    }
    double final_price = subtotal - (subtotal*discount_percent);
    
    cout<<"Discount: "<<(discount_percent*100)<<"%"<<endl;
    cout<<"Discount: $"<<fixed<<setprecision(2)<<(subtotal*discount_percent)<<endl;
    

    cout<<"Total: $"<<fixed<<setprecision(2)<<final_price<<endl<<endl;

    return 0;
}
