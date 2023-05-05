$(document).ready(function () {
  /**
   *
   * @param {*} bodyTable
   * @param {*} data
   */
  function buildBodyTable(bodyTable, data) {
    data.forEach((element) => {
      bodyTable.append(buildRow(element));
    });
  }

  /**
   * @param element
   * @return HTMLElement
   */
  function buildRow(element) {
    const row = $("<tr>");
    row.append(buildCell(element.Title));
    row.append(buildCell(element.ID));
    row.append(buildCell(element.Description));
    row.append(buildCell(element.StreamFormat));
    row.append(buildCellWithImage(element.Background));
    row.append(buildCellWithImage(element.Poster));
    row.append(buildCellWithLink(element.URL));
    row.append(buildCell(element.GUID));
    row.append(buildCell(element.Category));
    row.append(buildCell(element.Tags));
    return row;
  }
  /**
   *
   * @param {*} text
   * @returns
   */
  function buildCell(text) {
    const cell = $("<td>", {
      text: text,
      class: "text-wrap text-break",
    });
    return cell;
  }

  function buildCellWithImage(url) {
    const cell = $("<td>");
    const image = $("<img>", {
      src: url,
    });
    cell.append(image);
    return cell;
  }
  /**
   *
   */
  function buildCellWithLink(url) {
    const cell = $("<td>", {
      class: "text-break",
    });
    const link = $("<a>", {
      href: url,
      text: url,
    });
    cell.append(link);
    return cell;
  }
  /**
   *
   */
  function bootstrap() {
    $.get(
      "https://6454ff2ea74f994b334eff5e.mockapi.io/channels",
      function (data) {
        let table = $("#table-body");
        table.empty();
        buildBodyTable(table, data);
      }
    );
  }

  bootstrap();
});
