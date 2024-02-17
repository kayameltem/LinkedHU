package darth.linkedhu.entity.dtos;

import com.google.gson.annotations.SerializedName;
import darth.linkedhu.entity.Job;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class JobDto {
    @SerializedName("job")
    Job job;
}
