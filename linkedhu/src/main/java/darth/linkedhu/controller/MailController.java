package darth.linkedhu.controller;


import darth.linkedhu.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Mail")
public class MailController {

    @Autowired
    MailService mailService = new MailService();

    @PostMapping("/sendMail")
    public void sendMail(){
        mailService.sendMail("muhammetalicaki80@gmail.com","Deneme");
    }
}
