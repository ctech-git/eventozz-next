import React from "react";
import SeatPicker from "react-seat-picker";

export default class SeatAllocationComponent extends React.Component {
  render() {

    let rows = [

    ];

    for (var j = 0;j < 26;j = j + 1) {
      rows[j] = [];

      for (var i = 1;i < 40;i = i + 1) {
        //O push null é pra fazer a divisão das fileiras
        if (i == 11 || i == 31) {
          rows[j].push(
            null
          )

        }
        else {
          //Só fiz isso par deixar umas reservadas e outras não
          if (j < 4) {
            var isReserved = true;
          } else { var isReserved = false }

          rows[j].push(
            { id: i, number: '', isReserved: isReserved, tooltip: "Reserved by you" }
          )
        }
      }
    }





    return (
      <div>
        <div style={{ marginTop: "100px" }}>
          <h1>Mapa de assentos</h1>
          <SeatPicker
            rows={rows}
            maxReservableSeats={6}
            number
            visible
            selectedByDefault
            tooltipProps={{ multiline: true }}
          />
        </div>
      </div>
    );
  }
}
