package darth.linkedhu.controller;

import darth.linkedhu.entity.Academician;
import darth.linkedhu.entity.Graduate;
import darth.linkedhu.entity.Undergraduate;
import darth.linkedhu.entity.dtos.AcademicianDto;
import darth.linkedhu.entity.dtos.GraduateDto;
import darth.linkedhu.entity.dtos.UndergraduateDto;
import darth.linkedhu.service.UndergraduateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/undergraduate")
public class UndergraduateController {

    @Autowired
    UndergraduateService UndergraduateService = new UndergraduateService();

    @PostMapping("/getUndergraduate")
    public Undergraduate getUndergraduate(@RequestBody UndergraduateDto UndergraduateDto) throws InterruptedException, ExecutionException{
        return UndergraduateService.get(UndergraduateDto.getUndergraduate());
    }

    @PostMapping("/createUndergraduate")
    public String createUndergraduate(@RequestBody UndergraduateDto UndergraduateDto )
            throws InterruptedException, ExecutionException {
        return UndergraduateService.save(UndergraduateDto.getUndergraduate());
    }

    @PostMapping("/updateUndergraduate")
    public String updateUndergraduate(@RequestBody UndergraduateDto UndergraduateDto  ) throws InterruptedException, ExecutionException {
        return UndergraduateService.update(UndergraduateDto.getUndergraduate());
    }

    @PostMapping("/deleteUndergraduate")
    public String deleteGraduate(@RequestBody UndergraduateDto UndergraduateDto ){
        return UndergraduateService.delete(UndergraduateDto.getUndergraduate());
    }
}
