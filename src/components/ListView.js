import React from "react";

function ListView() {
  return (
    <tbody>
      <tr>
        <th scope="row">Tools</th>
        <td>2019.12.03</td>
        <td>2019.12.01</td>
        <td>고무망치</td>
        <td>none</td>
        <td>5 EA</td>
        <td>50,000원</td>
        <td>구매담당자</td>
        <td>없음</td>
        <td>
          <button className="btn btn-outline-danger">삭 제</button>
        </td>
      </tr>
    </tbody>
  );
}

export default ListView;
