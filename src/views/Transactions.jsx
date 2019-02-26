import React from 'react';

function Transactions() {
  return (
    <main className="container-fluid overflow-auto">
      <h2>Transactions</h2>
      <Filters />
      <Table />
    </main>
  );
}

function Filters() {
  return (
    <form>
      <input />
    </form>
  );
}

function Table() {
  return (
    <table className="table">
      <caption>Pyxis transactions</caption>
      <thead>
        <tr>
          <th scope="col">Date withdrawn</th>
          <th scope="col">User withdrawing</th>
          <th scope="col">Medication</th>
          <th scope="col">Strength</th>
          <th scope="col">Waste</th>
          <th scope="col">Date administered</th>
          <th scope="col">User administering</th>
          <th scope="col">Dose</th>
          <th scope="col">MRN</th>
          <th scope="col">Order ID</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>YYYY/MM/DD hh:mm</td>
          <td>Last, First</td>
          <td>Medication</td>
          <td>## mG</td>
          <td>## mG</td>
          <td>YYYY/MM/DD hh:mm</td>
          <td>Last, First</td>
          <td>## mG</td>
          <td>12345678</td>
          <td>000123ABCD</td>
        </tr>
        <tr>
          <td>YYYY/MM/DD hh:mm</td>
          <td>Last, First</td>
          <td>Medication</td>
          <td>## mG</td>
          <td>## mG</td>
          <td>YYYY/MM/DD hh:mm</td>
          <td>Last, First</td>
          <td>## mG</td>
          <td>12345678</td>
          <td>000123ABCD</td>
        </tr>
        <tr>
          <td>YYYY/MM/DD hh:mm</td>
          <td>Last, First</td>
          <td>Medication</td>
          <td>## mG</td>
          <td>## mG</td>
          <td>YYYY/MM/DD hh:mm</td>
          <td>Last, First</td>
          <td>## mG</td>
          <td>12345678</td>
          <td>000123ABCD</td>
        </tr>
        <tr>
          <td>YYYY/MM/DD hh:mm</td>
          <td>Last, First</td>
          <td>Medication</td>
          <td>## mG</td>
          <td>## mG</td>
          <td>YYYY/MM/DD hh:mm</td>
          <td>Last, First</td>
          <td>## mG</td>
          <td>12345678</td>
          <td>000123ABCD</td>
        </tr>
        <tr>
          <td>YYYY/MM/DD hh:mm</td>
          <td>Last, First</td>
          <td>Medication</td>
          <td>## mG</td>
          <td>## mG</td>
          <td>YYYY/MM/DD hh:mm</td>
          <td>Last, First</td>
          <td>## mG</td>
          <td>12345678</td>
          <td>000123ABCD</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Transactions;
