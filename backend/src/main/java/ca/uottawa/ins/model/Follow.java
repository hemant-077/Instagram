package ca.uottawa.ins.model;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Follow {
    private Integer followId;
    private Integer followerId;
    private Integer followeeId;
    private String followTimestamp;
}
