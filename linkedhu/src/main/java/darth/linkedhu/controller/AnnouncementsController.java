package darth.linkedhu.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import darth.linkedhu.entity.Announcements;
import darth.linkedhu.entity.User;
import darth.linkedhu.entity.dtos.AnnouncementsDto;
import darth.linkedhu.entity.dtos.ApplicationDto;
import darth.linkedhu.entity.dtos.UserDto;
import darth.linkedhu.enums.AnnouncementType;
import darth.linkedhu.service.AnnouncementsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/announcements")
public class AnnouncementsController {

    @Autowired
    AnnouncementsService announcementsService;

    @PostMapping("/getJobDocuments")
    public ArrayList<Announcements> getJobDocuments() throws ExecutionException, InterruptedException {
        return announcementsService.getAllDocuments(AnnouncementType.JOB);
    }

    @PostMapping("/getInternshipDocuments")
    public ArrayList<Announcements> getInternshipDocuments() throws ExecutionException, InterruptedException {
        return announcementsService.getAllDocuments(AnnouncementType.INTERNSHIP);
    }

    @PostMapping("/getProjectDocuments")
    public ArrayList<Announcements> getProjectDocuments() throws ExecutionException, InterruptedException {
        return announcementsService.getAllDocuments(AnnouncementType.PROJECT);
    }

    @PostMapping("/getScholarshipDocuments")
    public ArrayList<Announcements> getScholarshipDocuments() throws ExecutionException, InterruptedException {
        return announcementsService.getAllDocuments(AnnouncementType.SCHOLARSHIP);
    }

    @PostMapping("/apply")
    public boolean applyAnnouncement(@RequestBody ApplicationDto applicationDto) throws ExecutionException, InterruptedException {
        return announcementsService.applyAnnouncement(applicationDto.getApplication());
    }

    @PostMapping("/upload")
    public boolean upload(@RequestParam("file") MultipartFile multipartFile) {
        return announcementsService.upload(multipartFile);
    }

    @RequestMapping(value = "/download/{fileName}", method = RequestMethod.GET)
    public boolean download(@PathVariable String fileName) throws IOException {
        return announcementsService.download(fileName);
    }

    @PostMapping("/showApplicants")
    public ArrayList<User> showApplicants(@RequestBody AnnouncementsDto announcementsDto) throws ExecutionException, InterruptedException, IOException {
        return announcementsService.showApplicants(announcementsDto);
    }
}
