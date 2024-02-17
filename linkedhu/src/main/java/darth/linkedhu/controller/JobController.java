package darth.linkedhu.controller;

import darth.linkedhu.entity.Job;
import darth.linkedhu.entity.dtos.JobDto;
import darth.linkedhu.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/job")
public class JobController {

    @Autowired
    JobService jobService = new JobService();

    @PostMapping("/getJob")
    public Job getJob(@RequestBody JobDto jobDto) throws InterruptedException, ExecutionException {
        return jobService.get(jobDto.getJob());
    }

    @PostMapping("/createJob")
    public String createJob(@RequestBody JobDto jobDto) throws InterruptedException, ExecutionException {
        return jobService.save(jobDto.getJob());
    }

    @PostMapping("/updateJob")
    public String updateJob(@RequestBody JobDto jobDto) throws InterruptedException, ExecutionException {
        return jobService.update(jobDto.getJob());
    }

    @PostMapping("/deleteJob")
    public String deleteJob(@RequestBody JobDto jobDto){
        return jobService.delete(jobDto.getJob());
    }
}
