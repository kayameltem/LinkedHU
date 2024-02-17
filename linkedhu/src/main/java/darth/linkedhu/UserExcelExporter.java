package darth.linkedhu;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import darth.linkedhu.entity.User;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class UserExcelExporter {
    private XSSFWorkbook workbook;
    private XSSFSheet sheet;
    private List<User> listUsers;

    public UserExcelExporter(List<User> listUsers) {
        this.listUsers = listUsers;
        workbook = new XSSFWorkbook();
    }


    private void writeHeaderLine() {
        sheet = workbook.createSheet("Users");

        Row row = sheet.createRow(0);

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        style.setFont(font);

        createCell(row, 0, "National ID", style);
        createCell(row, 1, "Name", style);
        createCell(row, 2, "Surname", style);
        createCell(row, 3, "Mail", style);
        createCell(row, 4, "Type", style);
        createCell(row, 5, "Instagram", style);
        createCell(row, 6, "Facebook", style);
        createCell(row, 7, "LinkedIn", style);
        createCell(row, 8, "Twitter", style);
        createCell(row, 9, "Github", style);
        createCell(row, 10, "Phone Number", style);
        createCell(row, 11, "Birth Date", style);

    }

    private void createCell(Row row, int columnCount, Object value, CellStyle style) {
        sheet.autoSizeColumn(columnCount);
        Cell cell = row.createCell(columnCount);
        if (value instanceof Integer) {
            cell.setCellValue((Integer) value);
        } else if (value instanceof Boolean) {
            cell.setCellValue((Boolean) value);
        }else {
            cell.setCellValue((String) value);
        }
        cell.setCellStyle(style);
    }

    private void writeDataLines() {
        int rowCount = 1;

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setFontHeight(14);
        style.setFont(font);

        for (User user : listUsers) {
            Row row = sheet.createRow(rowCount++);
            int columnCount = 0;

            createCell(row, columnCount++, user.getNationalId(), style);
            createCell(row, columnCount++, user.getName(), style);
            createCell(row, columnCount++, user.getSurname(), style);
            createCell(row, columnCount++, user.getMail(), style);
            createCell(row, columnCount++, user.getType().toString(), style);
            createCell(row, columnCount++, user.getInstagramUrl(), style);
            createCell(row, columnCount++, user.getFacebookUrl(), style);
            createCell(row, columnCount++, user.getLinkedinUrl(), style);
            createCell(row, columnCount++, user.getTwitterUrl(), style);
            createCell(row, columnCount++, user.getGithubUrl(), style);
            createCell(row, columnCount++, user.getPhoneNumber(), style);
            createCell(row, columnCount++, user.getBirthdate(), style);

        }
    }

    public void export(String fileName) throws IOException {
        writeHeaderLine();
        writeDataLines();

        FileOutputStream stream = new FileOutputStream("C:\\Users\\kayam\\OneDrive\\Masaüstü\\" + fileName + ".xlsx");
        workbook.write(stream);
        workbook.close();
    }
}
