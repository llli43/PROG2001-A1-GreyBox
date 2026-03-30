using UnityEngine;

/// <summary>
/// 移动平台 - 在两点之间移动，可携带玩家
/// </summary>
public class MovingPlatform : MonoBehaviour
{
    [Header("移动设置")]
    [SerializeField] private Vector3 pointA;
    [SerializeField] private Vector3 pointB;
    [SerializeField] private float speed = 2f;
    [SerializeField] private bool startAtPointA = true;
    [SerializeField] private float waitTime = 1f;
    
    private Vector3 targetPosition;
    private float waitTimer;
    private bool isWaiting;
    
    void Start()
    {
        // 将局部坐标转换为世界坐标
        pointA = transform.TransformPoint(pointA);
        pointB = transform.TransformPoint(pointB);
        
        targetPosition = startAtPointA ? pointB : pointA;
        
        if (!startAtPointA)
        {
            transform.position = pointB;
        }
    }
    
    void Update()
    {
        if (isWaiting)
        {
            waitTimer -= Time.deltaTime;
            if (waitTimer <= 0)
            {
                isWaiting = false;
            }
            return;
        }
        
        // 移动到目标点
        transform.position = Vector3.MoveTowards(transform.position, targetPosition, speed * Time.deltaTime);
        
        // 到达目标点
        if (Vector3.Distance(transform.position, targetPosition) < 0.01f)
        {
            // 切换目标
            targetPosition = (targetPosition == pointA) ? pointB : pointA;
            
            // 等待
            if (waitTime > 0)
            {
                isWaiting = true;
                waitTimer = waitTime;
            }
        }
    }
    
    // 当玩家站在平台上时，将玩家设为平台的子物体
    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            other.transform.SetParent(transform);
        }
    }
    
    void OnTriggerExit(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            other.transform.SetParent(null);
        }
    }
    
    // 在编辑器中可视化路径
    void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.green;
        
        Vector3 worldPointA = Application.isPlaying ? pointA : transform.TransformPoint(pointA);
        Vector3 worldPointB = Application.isPlaying ? pointB : transform.TransformPoint(pointB);
        
        Gizmos.DrawLine(worldPointA, worldPointB);
        Gizmos.DrawWireCube(worldPointA, Vector3.one * 0.5f);
        Gizmos.DrawWireCube(worldPointB, Vector3.one * 0.5f);
    }
}
