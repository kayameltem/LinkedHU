package darth.linkedhu.entity.dtos;

import com.google.gson.annotations.SerializedName;
import darth.linkedhu.entity.Graduate;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class GraduateDto {

    @SerializedName("Graduate")
    Graduate graduate;

}
