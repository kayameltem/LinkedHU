package darth.linkedhu.controller;

import darth.linkedhu.entity.Scholarship;
import darth.linkedhu.entity.dtos.ScholarshipDto;
import darth.linkedhu.service.ScholarshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/scholarship")
public class ScholarshipController {

    @Autowired
    ScholarshipService scholarshipService = new ScholarshipService();

    @PostMapping("/getScholarship")
    public Scholarship getScholarship(@RequestBody ScholarshipDto scholarshipDto) throws InterruptedException, ExecutionException {
        return scholarshipService.get(scholarshipDto.getScholarship());
    }

    @PostMapping("/createScholarship")
    public String createScholarship(@RequestBody ScholarshipDto scholarshipDto) throws InterruptedException, ExecutionException {
        return scholarshipService.save(scholarshipDto.getScholarship());
    }

    @PostMapping("/updateScholarship")
    public String updateScholarship(@RequestBody ScholarshipDto scholarshipDto) throws InterruptedException, ExecutionException {
        return scholarshipService.update(scholarshipDto.getScholarship());
    }

    @PostMapping("/deleteScholarship")
    public String deleteScholarship(@RequestBody ScholarshipDto scholarshipDto){
        return scholarshipService.delete(scholarshipDto.getScholarship());
    }
}
