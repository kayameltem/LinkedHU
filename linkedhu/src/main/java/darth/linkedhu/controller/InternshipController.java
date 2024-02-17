package darth.linkedhu.controller;

import darth.linkedhu.entity.Internship;
import darth.linkedhu.entity.dtos.InternshipDto;
import darth.linkedhu.service.InternshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/internship")
public class InternshipController {

    @Autowired
    InternshipService internshipService = new InternshipService();

    @PostMapping("/getInternship")
    public Internship getInternship(@RequestBody InternshipDto internshipDto) throws InterruptedException, ExecutionException {
        return internshipService.get(internshipDto.getInternship());
    }

    @PostMapping("/createInternship")
    public String createInternship(@RequestBody InternshipDto internshipDto) throws InterruptedException, ExecutionException {
        return internshipService.save(internshipDto.getInternship());
    }

    @PostMapping("/updateInternship")
    public String updateInternship(@RequestBody InternshipDto internshipDto) throws InterruptedException, ExecutionException {
        return internshipService.update(internshipDto.getInternship());
    }

    @PostMapping("/deleteInternship")
    public String deleteInternship(@RequestBody InternshipDto internshipDto){
        return internshipService.delete(internshipDto.getInternship());
    }
}
