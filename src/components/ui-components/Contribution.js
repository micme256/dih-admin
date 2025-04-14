import React from "react";

const Contribution = ({ contributions }) => {
  const [headers, ...rows] = contributions;

  return (
    <section className="contribution">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((contribution) => (
            <tr key={contribution[0]}>
              {contribution.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Contribution;

