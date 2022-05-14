import Holidays from "date-holidays";
var hd = new Holidays()
hd.init('PT')
const nationalHolidays = new Set(hd.getHolidays(2022).map(e => getDay(e.start)))

export function getDay(date: Date): number {
  let result = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
  return result.getTime();
}

export function shouldDisableDate(date: Date) {
  return date.getDay() === 6 || nationalHolidays.has(getDay(date))
}

export function download(content: string) {
  let dataStr = "data:text;charset=utf-8," + encodeURIComponent(
    content
  );
  let downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "mapa.txt");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove()
}

export const readFile = () => new Promise<string>((resolve, reject) => {
  let fileInputNode = document.createElement('input');
  fileInputNode.setAttribute("type", "file");
  fileInputNode.onchange = (e: any) => {
    let file = e.target.files[0];
    if (!file) {
      reject();
    }
    let reader = new FileReader();
    reader.onload = function (e) {
      var contents = e.target.result;
      resolve(contents as string);
    };
    reader.readAsText(file)
  }
  document.body.appendChild(fileInputNode); // required for firefox
  fileInputNode.click();
  fileInputNode.remove();
})


export function loadData() {
  const data = JSON.parse(localStorage.getItem("data"))
  return {
    people: data.people.map(e => ({ ...e, holidays: new Set(e.holidays) })),
    deletedPeople: data.deletedPeople.map(e => ({ ...e, holidays: new Set(e.holidays) }))
  }
}
