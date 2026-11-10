const ExcelJs = require('exceljs');

async function writeExcelTest(searchText, replaceText, change, filePath)
{
     const workbook= await readExcel(filePath);
     const worksheet = workbook.getWorksheet("Sheet1");
      if (!worksheet) {
        throw new Error('Worksheet "Sheet1" not found');
    }
     findAndReplaceCell(worksheet,searchText,replaceText, change);
     await writeInExcel(workbook,filePath);
}

async function readExcel(filePath)
{
     const workbook= new ExcelJs.Workbook();
     await workbook.xlsx.readFile(filePath);
     return workbook;
}

function findAndReplaceCell(worksheet,searchText,replaceText, change) 
{
     worksheet.eachRow((row,rowNum)=> {
        row.eachCell((cell,colNumber)=> {
            if(cell.value===searchText) 
            {
               replaceTextInExcel(worksheet,rowNum+change.row,colNumber+change.col,replaceText)
            }
        })
    });  
}


function replaceTextInExcel(worksheet,row,col,replaceText) {
     const cell= worksheet.getCell(row,col);
     cell.value= replaceText;
}

async function writeInExcel(workbook,filePath)
{
    await workbook.xlsx.writeFile(filePath);
}

module.exports = {
    writeExcelTest
};