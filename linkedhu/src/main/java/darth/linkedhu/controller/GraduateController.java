package darth.linkedhu.controller;

import darth.linkedhu.entity.Academician;
import darth.linkedhu.entity.Graduate;
import darth.linkedhu.entity.dtos.AcademicianDto;
import darth.linkedhu.entity.dtos.GraduateDto;
import darth.linkedhu.service.GraduateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/graduate")
public class GraduateController {

    @Autowired
    GraduateService graduateService = new GraduateService();

    @PostMapping("/getGraduate")
    public Graduate getGraduate(@RequestBody GraduateDto graduateDto) throws InterruptedException, ExecutionException{
        return graduateService.get(graduateDto.getGraduate());
    }

    @PostMapping("/createGraduate")
    public String createGraduate(@RequestBody GraduateDto graduateDto )
            throws InterruptedException, ExecutionException {
        return graduateService.save(graduateDto.getGraduate());
    }

    @PostMapping("/updateGraduate")
    public String updateGraduate(@RequestBody GraduateDto graduateDto  ) throws InterruptedException, ExecutionException {
        return graduateService.update(graduateDto.getGraduate());
    }

    @PostMapping("/deleteGraduate")
    public String deleteGraduate(@RequestBody GraduateDto graduateDto ){
        return graduateService.delete(graduateDto.getGraduate());
    }
}
