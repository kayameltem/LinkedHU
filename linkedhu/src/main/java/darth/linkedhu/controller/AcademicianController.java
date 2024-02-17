package darth.linkedhu.controller;

import darth.linkedhu.entity.Academician;
import darth.linkedhu.entity.dtos.AcademicianDto;
import darth.linkedhu.service.AcademicianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/academician")
public class AcademicianController {

    @Autowired
    AcademicianService academicianService;

    @PostMapping("/getAdmin")
    public Academician getAcademician(@RequestBody AcademicianDto academicianDto) throws InterruptedException, ExecutionException{
        return academicianService.get(academicianDto.getAcademician());
    }

    @PostMapping("/createAcademician")
    @ResponseBody
    public String createAcademician(@RequestBody AcademicianDto academicianDto ) throws InterruptedException, ExecutionException {
        return academicianService.save(academicianDto.getAcademician());
    }

    @PostMapping("/updateAcademician")
    public String updateAcademician(@RequestBody AcademicianDto academician  ) throws InterruptedException, ExecutionException {
        return academicianService.update(academician.getAcademician());
    }

    @PostMapping("/deleteAcademician")
    public String deleteAcademician(@RequestBody AcademicianDto academicianDto ){
        return academicianService.delete(academicianDto.getAcademician());
    }


}

