package darth.linkedhu.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import darth.linkedhu.UserExcelExporter;
import darth.linkedhu.entity.Admin;
import darth.linkedhu.entity.User;
import darth.linkedhu.entity.dtos.AdminDto;
import darth.linkedhu.entity.dtos.AnnouncementsDto;
import darth.linkedhu.entity.dtos.UserDto;
import darth.linkedhu.service.AdminService;
import darth.linkedhu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    @PostMapping("/getAdmin")
    public Admin getAdmin(@RequestBody AdminDto adminDto) throws InterruptedException, ExecutionException{
        return adminService.get(adminDto.getAdmin());
    }

    @PostMapping("/createAdmin")
    @ResponseBody
    public String createAdmin(@RequestBody  AdminDto adminDto ) throws InterruptedException, ExecutionException, JsonProcessingException {
        return adminService.save(adminDto.getAdmin());
    }

    @PostMapping("/updateAdmin")
    public String updateAdmin(@RequestBody  AdminDto adminDto  ) throws InterruptedException, ExecutionException {
        return adminService.update(adminDto.getAdmin());
    }

    @PostMapping("/deleteAdmin")
    public String deleteAdmin(@RequestBody  AdminDto adminDto ){
        return adminService.delete(adminDto.getAdmin());
    }

    @PostMapping("/deleteAnnouncement")
    public boolean deleteAnnouncement(@RequestBody AnnouncementsDto announcementDto) throws ExecutionException, InterruptedException {
        return adminService.deleteAnnouncement(announcementDto);
    }

    @PostMapping("/deleteUser")
    public boolean deleteUser(@RequestBody UserDto userDto) throws ExecutionException, InterruptedException {
        return adminService.deleteUser(userDto);
    }

    @GetMapping("/export")
    public void exportToExcel() throws IOException, ExecutionException, InterruptedException {
        UserService service = new UserService();
        List<User> listUsers = service.listAll();

        UserExcelExporter excelExporter = new UserExcelExporter(listUsers);
        excelExporter.export("users");
    }

    @PostMapping("/findByNationalId")
    public User find(@RequestParam String searchKey) throws InterruptedException, ExecutionException {
        return adminService.findByNationalId(searchKey);
    }

    @PostMapping("/listAllAsJson")
    public List<User> listAllAsJson() throws ExecutionException, InterruptedException {
        return adminService.listAllAsJson();
    }
    @PostMapping("/getLog")
    public String getLog(@RequestParam String mail) throws InterruptedException, ExecutionException{
        return adminService.getLog(mail);
    }
}

