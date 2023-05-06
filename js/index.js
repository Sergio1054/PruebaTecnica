$(document).ready(function () {
  let original_data = [];
  /**
   *
   * @param {*} bodyTable
   * @param {*} data
   */
  function buildBodyTable(bodyTable, data) {
    bodyTable.empty();
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
  /**
   *
   * @param {*} url
   * @returns
   */
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
   * @param {*} url
   * @returns
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

  function bootstrap() {
    $.get(
      "https://6454ff2ea74f994b334eff5e.mockapi.io/channels",
      function (new_data) {
        let table = $("#table-body");
        original_data = new_data;
        buildBodyTable(table, original_data);
      }
    );
  }
  $("#form-search").submit(function (e) {
    e.preventDefault();
    const fields_to_filter = [
      "Title",
      "ID",
      "Description",
      "StreamFormat",
      "GUID",
      "Category",
    ];
    const filter = $(e.target).find("input").val().toLowerCase();
    const filtered_data = original_data.filter(function (e) {
      for (const field of fields_to_filter) {
        if (e[field].toLowerCase().includes(filter)) {
          return true;
        }
      }
      for (const tag of e.Tags) {
        if (tag.toLowerCase().includes(filter)) {
          return true;
        }
      }
      return false;
    });
    buildBodyTable($("#table-body"), filtered_data);
  });

  bootstrap();
});
