    //generic function to perfrom page changes
    function changePage(page){
        window.location.href = page;
    }
    //---------------------VIR Calculator functions----------------------
    
    $(document).ready(function () {
        // Show/hide based on mode selection.
            $("#VIRselector").on("change", function () {
                let mode = $(this).val();
                $("#vInput, #iInput, #rInput").val("");
                $("#resultValue").text("--");
                if (mode === "Voltage") {
                    $("#VIR_V").hide();
                    $("#VIR_I").show();
                    $("#VIR_R").show();
                    $("#result").show();
                    $("#calcType").text("Voltage");
                    $("#formula").text("[I x R]");
                    $("#unit").text("V");
                } else if (mode === "Current") {
                    $("#VIR_V").show();
                    $("#VIR_I").hide();
                    $("#VIR_R").show();
                    $("#result").show();
                    $("#calcType").text("Current");
                    $("#formula").text("[V / R]");
                    $("#unit").text("A");
                }else if (mode === "Resistance") {
                    $("#VIR_V").show();
                    $("#VIR_I").show();
                    $("#VIR_R").hide();
                    $("#VIR_P").show();
                    $("#result").show();
                    $("#calcType").text("Resistance");
                    $("#formula").text("[V / I]");
                    $("#unit").text("Ω");
                }else if (mode === "Power") {
                    $("#VIR_V").show();
                    $("#VIR_I").show();
                    $("#VIR_R").hide();
                    $("#result").show();
                    $("#calcType").text("Power");
                    $("#formula").text("[V x I]");
                    $("#unit").text("W");
                }
            });
            
            // Function to calculate selected value on input
            $("#vInput, #iInput, #rInput").on("input", function() {
                let mode = $("#VIRselector").val();
                if (mode === "Voltage") {
                    if ($("#iInput").val().trim() !== "" && $("#rInput").val().trim() !== "") {
                        let iValue = parseFloat($("#iInput").val().trim(), 10);
                        let rValue = parseFloat($("#rInput").val().trim(), 10);
                        let calculated = iValue * rValue;
                        $("#resultValue").text(calculated.toFixed(2));
                    } else {
                        $("#resultValue").text("--");
                    }
                }
                if (mode === "Current") {
                    if ($("#vInput").val().trim() !== "" && $("#rInput").val().trim() !== "") {
                        let vValue = parseFloat($("#vInput").val().trim(), 10);
                        let rValue = parseFloat($("#rInput").val().trim(), 10);
                        let calculated = vValue / rValue;
                        if (calculated < 1){
                            $("#unit").text("mA");
                            $("#resultValue").text((calculated*1000).toFixed(2));
                        } else{
                            $("#resultValue").text(calculated.toFixed(2));
                            $("#unit").text("A");
                        }
                    } else {
                        $("#resultValue").text("--");
                    }
                }
                if (mode === "Resistance") {
                    if ($("#iInput").val().trim() !== "" && $("#vInput").val().trim() !== "") {
                        let iValue = parseFloat($("#iInput").val().trim(), 10);
                        let vValue = parseFloat($("#vInput").val().trim(), 10);
                        let calculated = vValue / iValue;
                        $("#resultValue").text(calculated.toFixed(2));
                    } else {
                        $("#resultValue").text("--");
                    }
                }
                if (mode === "Power") {
                    if ($("#iInput").val().trim() !== "" && $("#vInput").val().trim() !== "") {
                        let iValue = parseFloat($("#iInput").val().trim(), 10);
                        let vValue = parseFloat($("#vInput").val().trim(), 10);
                        let calculated = vValue * iValue;
                        $("#resultValue").text(calculated.toFixed(2));
                    } else {
                        $("#resultValue").text("--");
                    }
                }
            });
        });
    
        //---------------------Voltage Divider functions----------------------
    
         // Generic function to display colour bands based on which resistor field was input
        function autoCalculateByResistance(selection) {
         
          var inputVal = (selection === 1) ? $("#R1").val() : $("#R2").val();
          
          var R = parseFloat(inputVal);
          if (!R || R <= 0) {
            if (selection === 1) {
              $(".vd1_band.band5, .vd1_sband.band6, .vd1_sband.band7, .vd1_band.band8").css("background-color", "transparent");
            } else {
              $(".vd2_band.band9, .vd2_sband.band10, .vd2_sband.band11, .vd2_band.band12").css("background-color", "transparent");
            }
            return;
          }
          
          // Create map to associate colour to a number value 
          var digitToColour = {
            0: "Black", 1: "Brown", 2: "Red", 3: "Orange", 4: "Yellow",
            5: "Green", 6: "Blue", 7: "Purple", 8: "Gray", 9: "White"
          };
          // Create map to associate colour to a number value for multiplier 
          var multiplierToColour = {
            1: "Black", 10: "Brown", 100: "Red", 1000: "Orange",
            10000: "Yellow", 100000: "Green", 1000000: "Blue"
          };
          var allowedMultipliers = [1, 10, 100, 1000, 10000, 100000, 1000000];
          
          var validCombo = false;
          var chosenMultiplier = null;
          var quotient = null;
          
          //takes the entered band colours and validates if they are valid colour combinations
          for (var i = 0; i < allowedMultipliers.length; i++) {
            var m = allowedMultipliers[i];
            if (R % m === 0) {
              quotient = R / m;
              if (quotient < 10 || (quotient >= 10 && quotient < 100)) {
                validCombo = true;
                chosenMultiplier = m;
                break;
              }
            }
          }
          
          //if invalid combination entered, sets all bands to clear
          if (!validCombo || quotient === null) {
            if (selection === 1) {
              $(".vd1_band.band5, .vd1_sband.band6, .vd1_sband.band7, .vd1_band.band8").css("background-color", "transparent");
            } else {
              $(".vd2_band.band9, .vd2_sband.band10, .vd2_sband.band11, .vd2_band.band12").css("background-color", "transparent");
            }
            return;
          }
          
          //pull first and second digit from entered value
          var firstDigit = 0;
          var secondDigit = 0;
          if (quotient < 10) {
            firstDigit = 0;
            secondDigit = quotient;
          } else {
            firstDigit = Math.floor(quotient / 10);
            secondDigit = quotient % 10;
          }
          
          // Update the band colours by converting each digit to a colour
          if (selection === 1) {
            $(".vd1_band.band5").css("background-color", digitToColour[firstDigit].toLowerCase());
            $(".vd1_sband.band6").css("background-color", digitToColour[secondDigit].toLowerCase());
            $(".vd1_sband.band7").css("background-color", multiplierToColour[chosenMultiplier].toLowerCase());
            $(".vd1_band.band8").css("background-color", "gold");
          } else {
            $(".vd2_band.band9").css("background-color", digitToColour[firstDigit].toLowerCase());
            $(".vd2_sband.band10").css("background-color", digitToColour[secondDigit].toLowerCase());
            $(".vd2_sband.band11").css("background-color", multiplierToColour[chosenMultiplier].toLowerCase());
            $(".vd2_band.band12").css("background-color", "gold");
          }
        }
        
        // Attach event listeners to change colour bands on r1 input
        $("#R1").on("input", function () {
          if ($(this).val().trim() === "") {
            $(".vd1_band.band5, .vd1_sband.band6, .vd1_sband.band7, .vd1_band.band8").css("background-color", "transparent");
          } else {
            autoCalculateByResistance(1);
          }
        });
        
        //Attach event listeners to change colour bands on r2 input
        $("#R2").on("input", function () {
          if ($(this).val().trim() === "") {
            $(".vd2_band.band9, .vd2_sband.band10, .vd2_sband.band11, .vd2_band.band12").css("background-color", "transparent");
          } else {
            autoCalculateByResistance(2);
          }
        });
    
        // Attach event listeners on all v divider input fields.
        $(document).ready(function(){
          $("#VIN, #R1, #R2").on("input", function(){
            // Check that all three fields have non-empty values.
            if ($("#VIN").val().trim() !== "" && 
                $("#R1").val().trim() !== "" && 
                $("#R2").val().trim() !== "") {
    
              var vin = parseFloat($("#VIN").val().trim());
              var r1 = parseFloat($("#R1").val().trim());
              var r2 = parseFloat($("#R2").val().trim());
              
              // Ensure the parsed values are valid and the resistor sum isn't zero.
              if (!isNaN(vin) && !isNaN(r1) && !isNaN(r2) && (r1 + r2) !== 0) {
                var vout = vin * (r2 / (r1 + r2));
                // Display the result with two decimal places.
                $("#voutResult").text(vout.toFixed(2) + " V");
              } else {
                $("#voutResult").text("--");
              }
            } else {
              // If any field is empty, show a placeholder.
              $("#voutResult").text("--");
            }
          });
        });
  
        
      //---------------------Main functions----------------------
  
  
  
      // Show/hide based on mode selection.
      $(document).ready(function () {
  
        // Show/hide based on mode selection.
        $("#resistorMode").on("change", function () {
          let mode = $(this).val();
          if (mode === "Colour") {
            $("#byColour").show();
            $("#byResistance").hide();
          } else if (mode === "Resistance") {
            $("#byResistance").show();
            $("#byColour").hide();
          } else {
            $("#byColour").hide();
            $("#byResistance").hide();
          }
        });
  
        // Function to calculate resistance using the Colour Bands.
        function calculateResistance() {
          var band1Value = $("#band1").val();
          var band2Value = $("#band2").val();
          var multiplierValue = $("#multiplier").val();
          var toleranceColor = $("#tolerence").val();
  
  
          //Mapping digit to a colour
          if (band1Value && band2Value && multiplierValue) {
            var digitsMapping = {
              "Black": 0,
              "Brown": 1,
              "Red": 2,
              "Orange": 3,
              "Yellow": 4,
              "Green": 5,
              "Blue": 6,
              "Purple": 7,
              "Gray": 8,
              "White": 9
            };
  
            //Mapping digit to a colour for multiplier
            var multiplierMapping = {
              "Black": 1,
              "Brown": 10,
              "Red": 100,
              "Orange": 1000,
              "Yellow": 10000,
              "Green": 100000,
              "Blue": 1000000
            };
  
            //Mapping digit to a colour for tolerance
            var toleranceMapping = {
              "Brown": "±1%",
              "Red": "±2%",
              "Gold": "±5%",
              "Gray": "±0.5%"
            };
  
            //Associate each digit to a number corresponding to it's colour band
            var firstDigit = digitsMapping[band1Value];
            var secondDigit = digitsMapping[band2Value];
            var mult = multiplierMapping[multiplierValue];
            var resistance = ((firstDigit * 10) + secondDigit) * mult;
            var displayValue;
            if (resistance >= 1000000) {
              displayValue = (resistance / 1000000) + " MΩ";
            } else if (resistance >= 1000) {
              displayValue = (resistance / 1000) + " kΩ";
            } else {
              displayValue = resistance + " Ω";
            }
            if (toleranceColor) {
              displayValue += " (" + toleranceMapping[toleranceColor] + " tolerance)";
            }
            $("#resultValue").text(displayValue);
          } else {
            $("#resultValue").text("--");
          }
        }
  
        // Function to update overlay band colors from Colour mode selections.
        function updateBandColors() {
          var band1Color = $("#band1").val();
          var band2Color = $("#band2").val();
          var multiplierColor = $("#multiplier").val();
          var band4Color = $("#tolerence").val();
  
          $(".band.band1").css("background-color", band1Color ? band1Color.toLowerCase() : "transparent");
          $(".band2").css("background-color", band2Color ? band2Color.toLowerCase() : "transparent");
          $(".band3").css("background-color", multiplierColor ? multiplierColor.toLowerCase() : "transparent");
          $(".band.band4").css("background-color", band4Color ? band4Color.toLowerCase() : "transparent");
        }
  
        $("#band1, #band2, #multiplier, #tolerence").on("change", function () {
          calculateResistance();
          updateBandColors();
        });
  
        // Function to convert an entered resistor value into a valid 4‑band combination
        function autoCalculateByResistance() {
          var inputVal = $("#resistanceInput").val();
          var R = parseInt(inputVal);
          if (!R || R <= 0) {
            // Invalid input – set overlays to transparent and clear display.
            $(".band.band1, .band2, .band3, .band.band4").css("background-color", "transparent");
            $("#resultValue").text("--");
            return;
          }
          // Reverse mapping: digit to color
          var digitToColor = {
            0: "Black",
            1: "Brown",
            2: "Red",
            3: "Orange",
            4: "Yellow",
            5: "Green",
            6: "Blue",
            7: "Purple",
            8: "Gray",
            9: "White"
          };
          // Reverse mapping: multiplier to color
          var multiplierToColor = {
            1: "Black",
            10: "Brown",
            100: "Red",
            1000: "Orange",
            10000: "Yellow",
            100000: "Green",
            1000000: "Blue"
          };
          var allowedMultipliers = [1, 10, 100, 1000, 10000, 100000, 1000000];
          var validCombo = false;
          var chosenMultiplier = null;
          var quotient = null;
          // Try each allowed multiplier to see if R can be exactly represented.
          for (var i = 0; i < allowedMultipliers.length; i++) {
            var m = allowedMultipliers[i];
            if (R % m === 0) {
              quotient = R / m;
              // Allow quotient to be a 1-digit number or a 2-digit number.
              if (quotient < 10 || (quotient >= 10 && quotient < 100)) {
                validCombo = true;
                chosenMultiplier = m;
                break;
              }
            }
          }
          if (!validCombo || quotient === null) {
            // Input does not yield a valid 4‑band combination.
            $(".band.band1, .band2, .band3, .band.band4").css("background-color", "transparent");
            $("#resultValue").text("--");
            return;
          }
          var firstDigit = 0;
          var secondDigit = 0;
          if (quotient < 10) {
            firstDigit = 0;
            secondDigit = quotient;
          } else {
            firstDigit = Math.floor(quotient / 10);
            secondDigit = quotient % 10;
          }
          // Format the resistance for display.
          var calculatedResistance = ((firstDigit * 10) + secondDigit) * chosenMultiplier;
          var displayValue;
          if (calculatedResistance >= 1000000) {
            displayValue = (calculatedResistance / 1000000) + " MΩ";
          } else if (calculatedResistance >= 1000) {
            displayValue = (calculatedResistance / 1000) + " kΩ";
          } else {
            displayValue = calculatedResistance + " Ω";
          }
          // For Resistance mode, assume a default tolerance of Gold (±5%).
          displayValue += " (±5% tolerance)";
          $("#resultValue").text(displayValue);
  
          // Update overlay bands based on the auto-calculated digits.
          $(".band.band1").css("background-color", digitToColor[firstDigit].toLowerCase());
          $(".band2").css("background-color", digitToColor[secondDigit].toLowerCase());
          $(".band3").css("background-color", multiplierToColor[chosenMultiplier].toLowerCase());
          $(".band.band4").css("background-color", "gold");
        }
  
        // Attach an event listener on the resistance input (for Resistance mode).
        $("#resistanceInput").on("input", function () {
          if ($("#resistorMode").val() === "Resistance") {
            autoCalculateByResistance();
          }
        });
      });
  
  
  $(document).ready(function () {
      
    $("#resistorMode").on("change", function () {
      let mode = $(this).val();
      if (mode === "Colour") {
        $("#byColour").show();
        $("#byResistance").hide();
      } else if (mode === "Resistance") {
        $("#byResistance").show();
        $("#byColour").hide();
      } else {
        $("#byColour").hide();
        $("#byResistance").hide();
      }
    });
  
    
    function calculateResistance() {
      var band1Value = $("#band1").val();
      var band2Value = $("#band2").val();
      var multiplierValue = $("#multiplier").val();
      var toleranceColour = $("#tolerence").val();
  
      //Mapping digit to a colour
      if (band1Value && band2Value && multiplierValue) {
        var digitsMapping = {
          "Black": 0,
          "Brown": 1,
          "Red": 2,
          "Orange": 3,
          "Yellow": 4,
          "Green": 5,
          "Blue": 6,
          "Purple": 7,
          "Gray": 8,
          "White": 9
        };
  
        //Mapping digit to a colour for multiplier
        var multiplierMapping = {
          "Black": 1,
          "Brown": 10,
          "Red": 100,
          "Orange": 1000,
          "Yellow": 10000,
          "Green": 100000,
          "Blue": 1000000
        };
  
        //Mapping digit to a colour for tolerance
        var toleranceMapping = {
          "Brown": "±1%",
          "Red": "±2%",
          "Gold": "±5%",
          "Gray": "±0.5%"
        };
  
        //Associate each digit to a number corresponding to it's colour band
        var firstDigit = digitsMapping[band1Value];
        var secondDigit = digitsMapping[band2Value];
        var mult = multiplierMapping[multiplierValue];
        var resistance = ((firstDigit * 10) + secondDigit) * mult;
        var displayValue;
        if (resistance >= 1000000) {
          displayValue = (resistance / 1000000) + " MΩ";
        } else if (resistance >= 1000) {
          displayValue = (resistance / 1000) + " kΩ";
        } else {
          displayValue = resistance + " Ω";
        }
        if (toleranceColour) {
          displayValue += " (" + toleranceMapping[toleranceColour] + " tolerance)";
        }
        $("#resultValue").text(displayValue);
      } else {
        $("#resultValue").text("--");
      }
    }
  
    // Function to update overlay band colours from Colour mode selections.
    function updateBandColours() {
      var band1Colour = $("#band1").val();
      var band2Colour = $("#band2").val();
      var multiplierColour = $("#multiplier").val();
      var band4Colour = $("#tolerence").val();
  
      $(".band.band1").css("background-color", band1Colour ? band1Colour.toLowerCase() : "transparent");
      $(".band2").css("background-color", band2Colour ? band2Colour.toLowerCase() : "transparent");
      $(".band3").css("background-color", multiplierColour ? multiplierColour.toLowerCase() : "transparent");
      $(".band.band4").css("background-color", band4Colour ? band4Colour.toLowerCase() : "transparent");
    }
  
    $("#band1, #band2, #multiplier, #tolerence").on("change", function () {
      calculateResistance();
      updateBandColours();
    });
  
    // Function to convert an entered resistor value into a valid 4‑band combination
    function autoCalculateByResistance() {
      var inputVal = $("#resistanceInput").val();
      var R = parseInt(inputVal);
      if (!R || R <= 0) {
        // Invalid input – set overlays to transparent and clear display.
        $(".band.band1, .band2, .band3, .band.band4").css("background-color", "transparent");
        $("#resultValue").text("--");
        return;
      }
      // Reverse mapping digit to colour.
      var digitToColour = {
        0: "Black",
        1: "Brown",
        2: "Red",
        3: "Orange",
        4: "Yellow",
        5: "Green",
        6: "Blue",
        7: "Purple",
        8: "Gray",
        9: "White"
      };
      // Reverse mapping multiplier to colour.
      var multiplierToColour = {
        1: "Black",
        10: "Brown",
        100: "Red",
        1000: "Orange",
        10000: "Yellow",
        100000: "Green",
        1000000: "Blue"
      };
      var allowedMultipliers = [1, 10, 100, 1000, 10000, 100000, 1000000];
      var validCombo = false;
      var chosenMultiplier = null;
      var quotient = null;
      // Try each allowed multiplier to see if R can be exactly represented.
      for (var i = 0; i < allowedMultipliers.length; i++) {
        var m = allowedMultipliers[i];
        if (R % m === 0) {
          quotient = R / m;
          // Allow quotient to be a 1-digit number or a 2-digit number.
          if (quotient < 10 || (quotient >= 10 && quotient < 100)) {
            validCombo = true;
            chosenMultiplier = m;
            break;
          }
        }
      }
      
      // Input does not yield a valid combination.
      if (!validCombo || quotient === null) {
        $(".band.band1, .band2, .band3, .band.band4").css("background-color", "transparent");
        $("#resultValue").text("--");
        return;
      }
      var firstDigit = 0;
      var secondDigit = 0;
      if (quotient < 10) {
        firstDigit = 0;
        secondDigit = quotient;
      } else {
        firstDigit = Math.floor(quotient / 10);
        secondDigit = quotient % 10;
      }
      // Format the resistance for display.
      var calculatedResistance = ((firstDigit * 10) + secondDigit) * chosenMultiplier;
      var displayValue;
      if (calculatedResistance >= 1000000) {
        displayValue = (calculatedResistance / 1000000) + " MΩ";
      } else if (calculatedResistance >= 1000) {
        displayValue = (calculatedResistance / 1000) + " kΩ";
      } else {
        displayValue = calculatedResistance + " Ω";
      }
      // For Resistance mode, assume a default tolerance of Gold (±5%).
      displayValue += " (±5% tolerance)";
      $("#resultValue").text(displayValue);
  
      // Update overlay bands based on the auto-calculated digits.
      $(".band.band1").css("background-color", digitToColour[firstDigit].toLowerCase());
      $(".band2").css("background-color", digitToColour[secondDigit].toLowerCase());
      $(".band3").css("background-color", multiplierToColour[chosenMultiplier].toLowerCase());
      $(".band.band4").css("background-color", "gold");
    }
  
    // Attach an event listener on the resistance input (for Resistance mode).
    $("#resistanceInput").on("input", function () {
      if ($("#resistorMode").val() === "Resistance") {
        autoCalculateByResistance();
      }
    });
  });
  
