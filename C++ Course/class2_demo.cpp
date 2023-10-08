
// Online C++ Compiler - Build, Compile and Run your C++ programs online in your favorite browser

#include<iostream>

using namespace std;

int main(){
    int *val_ptr;
    val_ptr = (int*) malloc(4*sizeof(int));

    string val = "";

    cout<<"Enter 4 comma separated values:";

    cin>>val;
    
    cout<<"\n"<<val<<"\n";
    int n=0;
    cout<<"\nValue Length: "<<val.length()<<"\n";
    for(int i = 0; i<val.length(); i++){
        if(val[i] != ','){
            cout<<val[i]<<"\n";
            *(val_ptr+n)=val[i] - '0';
            n++;
        }
    }
    cout<<*(val_ptr);
}